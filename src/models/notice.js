'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NoticeSchema = Schema({
    title: String,
    summary: String,
    description: String,
    tags: String,
    section: String,
    autor: String
},
{ timestamps: { createdAt: true, updatedAt: true } }


);



module.exports = mongoose.model('Notice', NoticeSchema);
