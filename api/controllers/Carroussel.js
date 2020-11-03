const Carroussel = require("../../database/models/Carroussel");

module.exports = {

    // Method Get 
    get: async (req, res) => {
        const carroussel = await Carroussel.find([])
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
         
    }
    
}