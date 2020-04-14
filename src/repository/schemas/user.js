const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = {
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}