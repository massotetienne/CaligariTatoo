const mongoose = require('mongoose')

const CarrousselShema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     unique: true
    // },
    imageCarroussel: []
    // createDate: {
    //     type: Date,
    //     default: new Date()
    // }

})

const Carroussel = mongoose.model('Carroussel', CarrousselShema)

module.exports = Carroussel