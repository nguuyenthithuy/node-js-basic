import express from "express";
import homeController from '../controller/homeController'
let router = express.Router();

const initwebroute = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/dat', (req, res) => {
        res.send('Hello Nguyễn Thị Thủy i miss you')
    })
    return app.use('/', router)
}

export default initwebroute;