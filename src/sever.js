import express from "express";
import configViewEngine from "./configs/viewEngine";
import initwebroute from "./route/web";

const app = express();
require('dotenv').config();

const port = process.env.port || 3000;
// setup view engine
configViewEngine(app);

// init web router;
initwebroute(app);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



