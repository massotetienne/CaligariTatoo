const Carroussel = require("../../database/models/Carroussel");
const fs = require('fs')
const path = require('path')
module.exports = {

    // Method Get 
    get: async (req, res) => {
        const carroussel = await Carroussel.find({})
        // console.log(actus)

        res.render("/", {
            carroussel,    
        })
    },

    post: (req, res) => {
        const arrayCarrousel = []

        req.files.forEach((i) => {
            console.log(i)
            arrayCarrousel.push({
                name: i.originalname,
                path: '/carrousel/' + i.originalname,
                date: Date.now(),
                class: '',
            })
        })

        arrayCarrousel[0].class = 'active'

        // console.log('1')
        // console.log(req.body)
        // console.log('3')
        // console.log(req.files)
        // console.log('4')
        // console.log(arrayCarrousel)

        Carroussel.create({
            title: req.body.title,
            image: arrayCarrousel
        },
         
         (err) => {
            if (err) console.log(err)
            res.redirect('/admin')
        })
         
    },
    deleteOne: async (req, res, next) => {
        /*
         *  Supprimer notre article
         ***************************/
        const carroussel = await Carroussel.findOne({title: 'home'})
        const dbCarroussel = await Carroussel.findById(req.params.id),
         
            query = {
                _id: req.params.id
            },
            files = carroussel.image
            
        // ici on supprime nos objet de la collection
        Carroussel.deleteOne(
            query,

            // Callback de la fonction mongoose
            (err) => {
                if (err) throw err
                // ici on vient faire une boucle sur les image contenu par l'objet
                for (let i = 0; i < files.length; i++) {
                    if (files) {
                        // ici on supprime toutes les images en relation avec notre objet
                        fs.unlink(path.resolve('/public/carrousel/' + files[i].name), (err) => {
                            if (err) console.log(err)
                        })
                    }
                }
                // puis on redirige
                res.redirect('/')
            })
    },
    
}