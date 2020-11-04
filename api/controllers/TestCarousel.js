// Controller adminAcceuilCarousel

// Import du model Acceuil de la base de donnée
const CarouselAcceuil = require("../../database/models/Carroussel"); // Model database
const path = require('path'); // utile uniquement pour path.resolve plus bas
const Carroussel = require("../../database/models/Carroussel");
fs = require('fs') // fs require effacer un fichier


module.exports = {
  // Method Post (nous créons un article avec ses image)
  postArrayAcceuil: async (req, res, next) => {
    // tableau du req.files
    const files = req.files,
      // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
      arrayFiles = []

    // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
    // nos objets dans le tableaux
    for (let i = 0; i < files.length; i++) {
      const dbFilename = files[i].filename
      if (files) {
        console.log(files[i].filename)
        // C'est grace à la method push que nous inscrivont nos data dans nos Objets
        // Et nos objets dans le tableau
        arrayFiles.push({
          name: files[i].filename,
          filename: `/public/carrousel/${files[i].filename}`,
          orifginalname: files[i].originalname
        })
      }
    }

    // ajouter la classe active au premier element du tableau
    arrayFiles[0].class = 'active'

    // On push nos data dans la DB grace Mongoose
    Carroussel.create({
      // imgArticle: `/assets/images/${req.file.originalname}`,
      imageCarroussel: arrayFiles
    },
      // CallBack de la function Mongoose
      (error, post) => {
        res.redirect('/admin')
      })

  },

  putArrayAcceuil: async (req, res, next) => {
    /*
     *  Supprimer Une Image
     **********************/
    console.log('delete single img')
    const dbCarroussel = await Carroussel.findById(req.params.id),
      query = { _id: req.params.id },
      files = dbCarroussel.imageCarrousel,
      arrayFiles = []

    console.log('?? req.body')
    console.log(req.body)
    console.log('?? dbCarouselAcceuil')
    console.log(dbCarouselAcceuil)

    // boucle de selection de l'objet à supprimer
    for (let i = 0; i < files.length; i++) {
      const dbFilename = files[i].name
      // on ajoute la condition pour que l'élément égale a notre req.body ne sois pas
      // re-pusher dans notre tableau que l'on va ensuite inscrir dans la DB
      if (dbFilename !== req.body.deleteImg) {
        console.log(dbFilename)
        // On push les data de notre req.files dans arrayFiles
        arrayFiles.push({
          name: files[i].name,
          filename: files[i].filename,
          originalname: files[i].name
        })
      }
    }

    console.log('?? arrayfiles')
    console.log(arrayFiles)

    // Fonction update Mongoose
    CarouselAcceuil.updateOne(query, {
      ...req.body,
      imageCarroussel: arrayFiles
    },
      // CallBack de la function Mongoose
      (err) => {
        if (!err) {
          // unlink suprimera l'élément égale a notre req.body
          // voir le input dans la view html
          fs.unlink(path.resolve('public/carrousel/' + req.body.deleteImg),
            // CallBack de la function unlink
            (err) => {
              if (err) throw err
            })
          res.redirect('/admin')
        } else {
          return res.send(err)
        }
      })
  }

}