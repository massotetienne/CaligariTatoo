const Article = require('../../database/models/Article')
const  dateFormat = require  ('dateformat')
const now = new Date();

module.exports = {
    
    get: async (req, res) => {
        const actus = await Article.find({})
        console.log('Home Page')
        res.render('home',{
            actus,
        })
    }
}