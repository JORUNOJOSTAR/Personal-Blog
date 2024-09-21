import express from "express";
import { Article } from "../model/article.js";

const router = express.Router();


router.get("/home",(req,res)=>{
    res.render("home.ejs",{articles:Article.getArticleList()});
})

router.get("/article/:id",(req,res)=>{
    const articleId = req.params.id;
    
    res.render("article.ejs",Article.getArticle(articleId));
})

export default router;