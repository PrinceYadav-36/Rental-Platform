const Home =require("../models/home");

exports.getHomes=(req,res,next)=>{
  Home.fetchAll((registeredHomes )=> res.render('store/home-list',{
    registeredHomes:registeredHomes,pageTitle:'Home List',
    currPage:'Home'}) )
}

exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.findById(homeId,home=>{
    if(!home)
    {
      console.log("Home Not Found");
      res.redirect("/homes");
    }
    else
    {
    console.log("Home Details Found:",home);
    res.render("store/home-details",{
      home:home,
     pageTitle:'Home Details',
    currPage:'home-details'}) 
    }
  })
}

exports.getIndex=(req,res,next)=>{
  Home.fetchAll((registeredHomes )=> res.render('store/index',{
    registeredHomes:registeredHomes,pageTitle:'airbnb Home',
    currPage:'index'}) )
}

exports.getBookings=(req,res,next)=>{
   res.render('store/bookings',{
    pageTitle:'My Bookings',
    currPage:'bookings'})
}

exports.getFavouriteList=(req,res,next)=>{
   Home.fetchAll((registeredHomes )=> 
    res.render('store/favourite-list',{
    registeredHomes:registeredHomes,
    pageTitle:'My Favourites',
    currPage:'favourites'}))
}