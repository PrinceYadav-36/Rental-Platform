const Home =require("../models/home");

exports.getAddHome=(req,res,next)=>{
  console.log(req.url,req.method);
  res.render('host/edit-home',{pageTitle:'Add Home',currPage:'addHome',editing:false});
}

exports.getEditHome=(req,res,next)=>{
  const homeId=req.params.homeId;
  const editing=req.query.editing==='true';

  Home.findById(homeId,home=>{
    if(!home){
      console.log("Home not found for editing:");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId,editing,home);
    res.render('host/edit-home',{
    home:home,
    pageTitle:'Edit your Home',
    currPage:'host-home',
    editing:editing,
  })
  });
}

exports.postEditHome=(req,res,next)=>{
  const {id,houseName,price,location,rating,photoUrl}=req.body;
  const home=new Home(houseName,price,location,rating,photoUrl);
 // registeredHomes.push(req.body);
 home.id=id;
 home.save();
  res.redirect('/host/host-home-list');
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
  res.redirect('/host/host-home-list');
}

exports.postDeleteHome=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log("Came to delete ",homeId);
  Home.deleteById(homeId,error=>{
    if(error)
    {
      console.log("Error while deleting");
    }
    res.redirect('/host/host-home-list');
  })
}
