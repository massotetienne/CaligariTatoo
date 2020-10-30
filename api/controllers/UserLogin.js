const bcrypt = require ('bcrypt')
const User = require ('../../database/models/User')

module.exports ={

    get:(req,res)=>{
        res.render('log')
    },
    post: (req,res) => {

    const  { email, password } = req.body;

    User.findOne({email},(error,user) => {
        if (user) {

        bcrypt.compare(password,user.password, (error,same) =>{
            if(!same) {
                res.render('log',{
                errorLogin: "une erreur est survenue veuillez verifier vos identifiant et mots de passe"   
            })
                
            }
            else {
                req.session.userId = user._id
                res.redirect('/')
            }
            
        })
        

        }else{
            return res.redirect('/log')
        }

    })
    
    
 } 
} 
