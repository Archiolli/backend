const mongoose = require('mongoose')
const { Schema } = mongoose

const { serviceSchema } = require('./service')

const partySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    buget: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    services: {
        type: [serviceSchema],
    },


}, { timestamps: true }
)

const Party = mongoose.model('Party', partySchema)

module.exports = Party