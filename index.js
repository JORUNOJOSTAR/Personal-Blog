import app from "./server.js";
import publicRouter from "./controller/public.js";
import adminRouter from "./controller/admin.js";

app.use(publicRouter);
app.use(adminRouter);



app.get("*",(req,res)=>{
    res.redirect("/home");
})