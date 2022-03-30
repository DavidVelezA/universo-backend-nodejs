'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


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


NoticeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Notice', NoticeSchema);
