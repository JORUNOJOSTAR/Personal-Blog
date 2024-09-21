import express from "express";
import short from "short-uuid";
import { getDate } from "../lib/dateFormatter.js";
import { Article } from "../model/article.js";
import authMiddleWare from "../authentication/auth.js";

const router = express.Router();


router.get("/admin",authMiddleWare,(req,res)=>{
    res.render("admin.ejs",{articles: Article.getArticleList()});
})

router.get("/edit/:id",authMiddleWare,(req,res)=>{
    const articleId = req.params.id;
    const article = Article.getArticle(articleId);
    res.render("update.ejs",{
        pageTitle:"Update",
        publishingDate: getDate(),
        title: article.title,
        content: article.content,
        articleId: articleId
    });
})

router.get("/new",authMiddleWare,(req,res)=>{
    res.render("update.ejs",{
        pageTitle:"New",
        publishingDate: getDate()
    });
})

router.post("/update",authMiddleWare,(req,res)=>{
    const newFileId = req.body.articleId || short.generate();
    Article.saveArticle(req.body,newFileId);
    res.redirect("/admin");
})

router.get("/delete/:id",authMiddleWare,(req,res)=>{
    const articleId = req.params.id;
    Article.deleteArticle(articleId); 
    res.redirect("/admin");
})


export default router;