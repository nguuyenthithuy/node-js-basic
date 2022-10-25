import express from "express";
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');


let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })

let uploadmuiltiple = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3)

const initwebroute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getDetailpage)
    router.post('/creat-new-user', homeController.creatNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:id', homeController.getEditUser)
    router.post('/update-user', homeController.postUpdateUser)
    router.get('/upload', homeController.getUploadfilePage)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleuploadfile)
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadmuiltiple(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send('LIMIT_UNEXPECTED_FILE')
            }
            else if (err) {
                res.send(err)
            }
            else {
                next();
            }
        })
    }, homeController.uploadmultifiles)


    router.get('/dat', (req, res) => {
        res.send('Hello Nguyễn Thị Thủy i miss you')
    })
    return app.use('/', router)
}

export default initwebroute;