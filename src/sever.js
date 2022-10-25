import express from "express";
import configViewEngine from "./configs/viewEngine";
import initwebroute from "./route/web";
import initiparouter from "./route/api";

// import  config  from "dotenv";
const app = express();
require('dotenv').config();
var morgan = require('morgan')

const port = process.env.port;

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>>run into my middleware')
    console.log(req.method);
    next(); // nếu middleware hợp lệ thì cho chạy tiếp những hàm dưới
})

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setup view engine
configViewEngine(app);

// init web router;
initwebroute(app);
// init ipa router
initiparouter(app)

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



