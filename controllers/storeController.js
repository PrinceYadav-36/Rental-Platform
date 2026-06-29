const Home =require("../models/home");
const Favourite=require("../models/favourite");

exports.getHomes=(req,res,next)=>{
   Home.find().then(registeredHomes=>{
     res.render('store/home-list',{
    registeredHomes:registeredHomes,pageTitle:'Home List',
    currPage:'Home'}) })
}

exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.findById(homeId).then(home=>{
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
  Home.find().then(registeredHomes=>{
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
  const homeId=req.body.id;
  Favourite.findOne({houseId: homeId })
  .then((fav)=>{
    if(fav)
    {
      console.log("Already marked Favourites");
    }
    else 
    {
      fav=new Favourite({houseId:homeId});
        fav.save().then((result)=>{
       console.log("Fav added: ",result);
        })
    }
     res.redirect("/favourites");
  }).catch(err=>{
        console.log("Error while marking favourites: ",err);
      });
}

exports.postRemoveFromFavourite=(req,res,next)=>{
  const homeId=req.params.homeId;
  Favourite.findOneAndDelete({houseId:homeId}).then(result=>{
    console.log("Fav Removed: ",result);
  }).catch(err=>{
    console.log("Error while removing favourites: ",err);
  }).finally(()=>{
    res.redirect("/favourites");
  });
}

exports.getFavouriteList=(req,res,next)=>{
  Favourite.find()
  .populate("houseId")
  .then(favourites=>{
    const favouriteHomes=favourites.map((fav)=>fav.houseId);
    res.render('store/favourite-list',{
      favouriteHomes:favouriteHomes,
      pageTitle:'My Favourites',
      currPage:'favourites'
    }
  )})
}