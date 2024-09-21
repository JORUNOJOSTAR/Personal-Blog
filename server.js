import bodyParser from "body-parser";
import express from "express";

const APP_PORT = 3000;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(APP_PORT,()=>{
    console.log(`APP RUNNING ON ${APP_PORT}`);
})

export default app;