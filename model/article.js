import fs from "node:fs";
import { compareDate } from "../lib/dateFormatter.js";
const articleListFile = "./data/article_list/article_list.json";

function saveFile(file,data){
    let success = true;
    fs.writeFile(file,JSON.stringify(data),(err)=>{
        if(err){
            console.log("Erro Occur while saving data",err.message);
            success = false;
        } 
    });
    return success;
}

function readFile(file){
    let data = "{}";
    try{
        data = fs.readFileSync(file);
    }catch(err){
        console.log("No list file yet",err)
    }
    return JSON.parse(data);
}



export class Article{
    static getArticleList(){
        let data = readFile(articleListFile);
        let article_list = []
        data = Object.entries(data);
        data.forEach(element=>{
            let listObj = element[1];
            listObj["fileId"] = element[0]
            article_list.push(listObj);
        });
        
        article_list.sort(compareDate);
        return article_list;
    }

    static saveArticleList(fileId,reqBody){
        const data = readFile(articleListFile);
        data[fileId] = {
            title: reqBody.title,
            date: reqBody.publishingDate
        }
        console.log(data);
        saveFile(articleListFile,data);
    }
    
    static getArticle(articleId){
        const data =  readFile(`./data/article/${articleId}.json`);
        return data;
    }

    static saveArticle(reqBody,newFileId){
        const {title,publishingDate,content} = reqBody;
        const saveStatus = saveFile(`./data/article/${newFileId}.json`,{
            title: title,
            content: content,
            publishingDate: publishingDate
        });

        if(saveStatus){
            Article.saveArticleList(newFileId,reqBody);
        }
    }
    
    static deleteArticle(articleId){
        const targetFile = `./data/article/${articleId}.json`;
        try {
            fs.unlinkSync(targetFile);
            let data = readFile(articleListFile);
            delete data[articleId];
            saveFile(articleListFile,data);
            console.log(`FileId with ${targetFile} has been deleted`);
        } catch (err) {
            console.log('An error occurred: ', err.message);
        }
        
    }
}


