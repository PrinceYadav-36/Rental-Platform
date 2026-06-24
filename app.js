const path=require('path');

const express=require('express');

const storeRouter=require("./router/storeRouter");
const hostRouter=require("./router/hostRouter");
const rootDir=require("./utils/pathUtil");

const app=express();

app.set('view engine','ejs');
app.set('views','views');//views for html file

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,"public")));

const errorController=require("./controllers/errors");
app.use(errorController.get404);

const Port=3001;
app.listen(Port,()=>{
  console.log(`Server Running on address http://localhost:${Port}`);
});