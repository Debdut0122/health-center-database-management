const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phcSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type:  String,
        required: true
    },
    sex: {
        type: String,
        required:true
    },
    email:{
        type: String
    },
    phone: {
        type:String
    },
    description: {
        type:String,
        required:true
    },

}, {timestamps: true})

module.exports = mongoose.model('phcDatabase', phcSchema)