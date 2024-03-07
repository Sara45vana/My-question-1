const express=require("express");
const {open}=require("sqlite");
const path=require("path");
const sqlite3=require("sqlite3");
const app=express();
const dbpath=path.join(__dirname,"moviesData.db");
const db=null;
const initializeDBandServer=async()=>{
    try{
        db=await open({
            fileName:dbpath;
            driver:sqlite3.Database;
        });
        app.listen(3000,()=>{
            console.log("Server Running");
        })
    }
    catch(e){
        console.log(`DB error:${e.message}`);
        process.exit(1);
    }


}
initializeDBandServer();
app.get("/movies/",async(request,response)=>{
    const getmovie=`
    SELECT 
    * 
    FROM 
    MOVIE 
    ORDER BY movieid
    `;
    const movieArray=await db.all(getmovie);
    response.send(movieArray);

})
