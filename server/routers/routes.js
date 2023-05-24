const express = require("express");
const router = express.Router();
const multer = require('multer');
const { getUser, sendLink, getLinkPost, getAllPost, getPost, createKudo, postKudo, deletePost, putUpdatePost, getTitle, handleRegister, handleLogin, getUserboard, deleteUser } = require("../controllers/utils");
const DIR = './public/images/';
const uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, DIR);
    },
    filename: function (request, file, callback) {

        callback(null, file.originalname)
    }
});


var upload = multer({ storage: storage });

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/allpost', getAllPost);
router.get('/post/:id', getPost);
router.get('/links/:id', getLinkPost);
router.get('/dashboard/:id', getUserboard);
router.get('/title/:id', getTitle)
router.post("/create", createKudo);
router.post('/addpost', upload.single('image'), postKudo);
router.delete("/post/:id", deletePost);
router.delete("/admin-user/:id", deleteUser);
router.put("/update/:id", putUpdatePost);
router.post("/sendlink", sendLink);
router.get("/user", getUser);

module.exports = router;