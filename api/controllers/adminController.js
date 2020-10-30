const Article = require('../../database/models/Article')
const Gallerie = require('../../database/models/Gallerie')
const Event = require ('../../database/models/Event')
const Croquis = require('../../database/models/Croquis')
module.exports = {

    get: async(req, res) => {
        const dbArticle = await Article.find({})
        const dbGallerie = await Gallerie.find({})
        const dbEvent = await Event.find({})
        const dbCroquis = await Croquis.find({})
        res.render('admin', {
            layout: 'adminLayout',
            articles: dbArticle,
            kakawait: 'Super Kakawait',
            galleries: dbGallerie,
            event : dbEvent,
            croquis :dbCroquis,
        })

    }
}