const path=require('path');

const express=require('express');

const storeRouter=require("./router/storeRouter");
const hostRouter=require("./router/hostRouter");
const rootDir=require("./utils/pathUtil");
const errorController=require("./controllers/errors");
const db=require("./utils/databaseutil");


const app=express();

app.set('view engine','ejs');
app.set('views','views');//views for html file

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,"public")));

app.use(errorController.get404);

const Port=process.env.PORT || 3000;
app.listen(Port,()=>{
  console.log(`Server Running on address http://localhost:${Port}`);
});