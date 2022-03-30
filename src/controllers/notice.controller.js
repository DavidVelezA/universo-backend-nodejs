"use strict";

const Notice = require("../models/notice");

const controller = {

  save: (req, res) => {
    let response = {
      code: 200,
      status: "success",
      message: "Registro creado",
    };

    const { title, summary, description, tags, section, autor } = req.body;

    if (title && summary && description && tags && section && autor) {
      const notice = new Notice();

      // asignar valores
      notice.title = title;
      notice.summary = summary;
      notice.description = description;
      notice.tags = tags;
      notice.section = section;
      notice.autor = autor;

      // guardar
      notice.save((err, noticeStored) => {
        if (err || !noticeStored) {
          response.code = 500;
          response.status = "error";
          response.message = "El registro no se ha guardado";
        }
      });
    } else {
      response.code = 200;
      response.status = "info";
      response.message = "Faltan datos por enviar";
    }
    return res
      .status(response.code)
      .send({ status: response.status, message: response.message });
  },



  getAllPagination: (req, res) => {

    let response = {
      code: 200,
      status: "success",
      message: "Datos mostrados",
    };

    let page = 1;
    //cargar la libreria de paginacion en la clase a nivel del modelo

    // recoger la pagina actual
    if (req.params.page == null ||
        req.params.page == undefined ||
        req.params.page == 0 ||
        req.params.page == "0" ||
        !req.params.page) {

         page = 1;
    } else {
         page = parseInt(req.params.page);
    }

    // indicar las opcions de paginacion
    /*sort: 
    -1 para ordenar de mas nuevo a mas viejo
    1 para ordenar de mas nuevo a mas nuevo
    populate: 
    */
    let options = {
        sort: { date: -1 },
        limit: 8,
        page: page

    };

    // find paginado
    Notice.paginate({}, options, (err, notices) => {

        if (err || !notices ) {          
            response.code = 500;
            response.status = "error";
            response.message = "Error al hacer la consulta";

        }

        return res.status(response.code).send({
            status: response.status,
            message: response.message,
            notices: notices.docs,
            totalDocs: notices.totalDocs,
            totalPages: notices.totalPages

        });
    });
},


  getById: (req, res) => {
    const { id } = req.params;

    Notice.findById(id).exec((err, notice) => {
      return res.status(200).send({
        status: "success",
        notice,
      });
    });
  },

  update: (req, res) => {
    let response = {
      code: 200,
      status: "success",
      message: "Registro modificado",
    };

    const { id } = req.params;
    const { title, summary, description, tags, section, autor } = req.body;

    if (title && summary && description && tags && section && autor) {
      //montar un json con los datos modificables
      const dataupdate = {
        title,
        summary,
        description,
        tags,
        section,
        autor,
      };

      Notice.findOneAndUpdate(
        { _id: id },
        dataupdate,
        { new: true },
        (err, ProductUpdate) => {
          if (err || !ProductUpdate) {
            response.code = 500;
            response.status = "error";
            response.message = "No se ha atualizado el registro";
          }
        }
      );
    } else {
      response.code = 200;
      response.status = "info";
      response.message = "Faltan datos por enviar";
    }

    return res
      .status(response.code)
      .send({ status: response.status, message: response.message });
  },

  delete: (req, res) => {
    let response = {
      code: 200,
      status: "success",
      message: "Registro eliminado",
    };

    const { id } = req.params;

    Notice.findOneAndDelete({ _id: id }, (err, NoticeRemoved) => {
      if (err || !NoticeRemoved) {
        response.code = 500;
        response.status = "error";
        response.message = "No se ha podido eliminar";
      }

      return res
        .status(response.code)
        .send({ status: response.status, message: response.message });
    });
  },
  
};

module.exports = controller;
