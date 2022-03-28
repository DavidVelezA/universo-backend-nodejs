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

  getAll: (req, res) => {
    Notice.find().exec((err, notices) => {
      return res.status(200).send({
        status: "success",
        notices,
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
