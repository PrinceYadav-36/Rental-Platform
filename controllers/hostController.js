const Home =require("../models/home");

exports.getAddHome=(req,res,next)=>{
  console.log(req.url,req.method);
  res.render('host/addHome',{pageTitle:'Add Home',currPage:'addHome'});
}

exports.getHostHomes=(req,res,next)=>{
  Home.fetchAll((registeredHomes )=> res.render('host/host-home-list',{
    registeredHomes:registeredHomes,pageTitle:'Host Home List',
    currPage:'host-home'}) )
}

exports.postAddHome=(req,res,next)=>{
  const {houseName,price,location,rating,photoUrl}=req.body;
  const home=new Home(houseName,price,location,rating,photoUrl);
 // registeredHomes.push(req.body);
 home.save();
  res.render('host/home-added',{pageTitle:'Home Added successful',currPage:'homeAdded'});
}
