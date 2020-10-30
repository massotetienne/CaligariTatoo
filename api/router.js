// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    actusController = require('./controllers/actusController'),
    contactController = require('./controllers/contactController'),
    gallerieController = require('./controllers/gallerieController'),
    eventController = require('./controllers/eventController'),
    articleController = require('./controllers/articleController'),
    tarifController = require('./controllers/tarifController'),
    logController = require('./controllers/logController'),
    adminController = require('./controllers/adminController'),
    UserCreateController = require('./controllers/UserCreateController'),
    UserLogin = require ('./controllers/UserLogin')
    // UserAuthSucess = require ('../middleware/UserAuthSucess')
// ==========================================================
// ======Middleware=====

//  var UserAuthSucess = require ('../middleware/UserAuthSucess')

// =====USER==== A-FAIRE ==========

router.route("/user/get")
    .get(UserCreateController.get)

router.route("/user/post")
    .post(UserCreateController.post)

router.route("/user/LoginGet")
    .get(UserLogin.get)

router.route("/user/LoginPost")
    .post(UserLogin.post)



// ==============================================

//==== Actus ====
const upload = require('./config/multer')
const { get } = require('http')
const { post } = require('./controllers/tarifController')


// method get
router.route("/articles/get")
    .get(actusController.get)
// Formulaire de creation d'article
router.route("/articles/post")
    .post(upload.single('image'), actusController.post)
// Delete Article
router.route("/articles/delete/:id")
    .get(actusController.deleteOne)
// Update
router.route("/articles/update/:id")
    .post(upload.single('image'), actusController.update)

// =====================================================

//===== Gallerie =====

      // page article id 
router.route ("/article/:id")
    .get(articleController.get)
    //   ============   //
router.route("/gallerie/get")
    .get(gallerieController.get)
router.route("/gallerie/post")
    .post(upload.single('image'),gallerieController.post)
router.route("/gallerie/delete/:id")
    .get(gallerieController.deleteOne)
router.route("/gallerie/update/:id")
    .post(upload.single('image'), gallerieController.update)

// =====================================================

//===== Event =====

router.route("/event/get")
    .get(eventController.get)
router.route("/event/post")
    .post(upload.single('image'),eventController.post)
router.route("/event/delete/:id")
    .get(eventController.deleteOne)
router.route("/event/update/:id")
    .post(upload.single('image'), eventController.update)

// =====================================================

//===== Croquis =====

router.route("/croquis/get")
    .get(tarifController.get)
router.route("/croquis/post")
    .post(upload.single('image'),tarifController.post)
router.route("/croquis/delete/:id")
    .get(tarifController.deleteOne)
router.route("/croquis/update/:id")
    .post(upload.single('image'), tarifController.update)

// =====================================================
// Home

router.route('/')
    .get(homeController.get)

// Actus
router.route('/actus')
    .get(actusController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

// gallerie
router.route('/gallerie')
    .get(gallerieController.get)

// events
router.route('/event')
    .get(eventController.get)

// events
router.route('/article')
    .get(articleController.get)

// events
router.route('/tarif')
    .get(tarifController.get)

// log
router.route('/log')
    .get(logController.get)

// admin
router.route('/admin')
    .get(adminController.get)













module.exports = router;