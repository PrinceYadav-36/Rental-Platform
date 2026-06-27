const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const path=require('path');

const express=require('express');

const storeRouter=require("./router/storeRouter");
const hostRouter=require("./router/hostRouter");
const rootDir=require("./utils/pathUtil");
const errorController=require("./controllers/errors");
const {mongoConnect}=require("./utils/databaseutil");


const app=express();

app.set('view engine','ejs');
app.set('views','views');//views for html file

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir,"public")));
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(errorController.get404);

const Port=process.env.PORT || 3000;
mongoConnect(()=>{
  app.listen(Port,()=>{
  console.log(`Server Running on address http://localhost:${Port}`);
});
})