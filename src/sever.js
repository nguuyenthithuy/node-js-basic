import express from "express";
import configViewEngine from "./configs/viewEngine";
const app = express();
require('dotenv').config();

const port = process.env.port || 3000;

configViewEngine(app);
app.get('/', (req, res) => {
    res.render('test/index.ejs')
})

app.get('/dat', (req, res) => {
    res.send('Hello Nguyễn Thị Thủy i miss you')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



