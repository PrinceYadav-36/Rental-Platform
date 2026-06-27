const Home =require("../models/home");
const Favourite=require("../models/favourite");

exports.getHomes=(req,res,next)=>{
   Home.fetchAll().then(([registeredHomes,fields])=>{
     res.render('store/home-list',{
    registeredHomes:registeredHomes,pageTitle:'Home List',
    currPage:'Home'}) })
}

exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.findById(homeId).then(([homes])=>{
    const home=homes[0];
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
  Home.fetchAll().then(([registeredHomes,fields])=>{
      res.render('store/index',{
    registeredHomes:registeredHomes,
    pageTitle:'StayEase Home',
    currPage:'index'})
  })
}

exports.getBookings=(req,res,next)=>{
   res.render('store/bookings',{
    pageTitle:'My Bookings',
    currPage:'bookings'})
}

exports.postAddToFavourite=(req,res,next)=>{
  console.log("Came to favourites",req.body);
  Favourite.addToFavourite(req.body.id,error=>{
    if(error)
    {
      console.log("Error while marking Favourite:",error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite=(req,res,next)=>{
  const homeId=req.params.homeId;
  Favourite.deleteById(homeId,error=>{
    if(error)
    {
      console.log("Error while removing from Favorite",error);
    }
    res.redirect("/favourites");
  })
}
exports.getFavouriteList=(req,res,next)=>{
  Favourite.getFavourites(favourites=>{
    Home.fetchAll().then(([registeredHomes,fields])=>{
    const favouriteHomes=registeredHomes.filter(home=>favourites.includes(home.id));
    res.render('store/favourite-list',{
      favouriteHomes:favouriteHomes,
      pageTitle:'My Favourites',
      currPage:'favourites'
    }
  )})
  })
}