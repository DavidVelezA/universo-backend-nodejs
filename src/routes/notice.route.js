'use strict'

const express = require('express');
const NoticeController = require('../controllers/notice.controller');
const router = express.Router();


//rutas de api
router.post('/notice', NoticeController.save);
router.get('/notice',  NoticeController.getAll);
router.get('/notice/:id',  NoticeController.getById);
router.put('/notice/:id', NoticeController.update);
router.delete('/notice/:id', NoticeController.delete);

module.exports = router;