import express from "express";
import apicontroller from '../controller/apicontroller'


let router = express.Router();

const initiparouter = (app) => {
    router.get('/users', apicontroller.getAllUser) // meyhod get -> read data
    router.post('/creat-user', apicontroller.creatnewuser) // method post creat
    router.put('/updateuser', apicontroller.updateuser)// method PUT -> update data
    router.delete('/deleteuser/:id', apicontroller.deleteuser)
    return app.use('/api/v1/', router)
}

export default initiparouter;