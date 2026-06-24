//const path=require('path');
const express=require('express');
const storeRouter=express.Router();
//const rootDir=require("../utils/pathUtil");
//const { registeredHomes } = require('./hostRouter');
const storeControllers=require("../controllers/storeController")

storeRouter.get("/",storeControllers.getIndex)
storeRouter.get("/bookings",storeControllers.getBookings);
storeRouter.get("/homes",storeControllers.getHomes);
storeRouter.get("/favourites",storeControllers.getFavouriteList);
storeRouter.get("/homes/:homeId",storeControllers.getHomeDetails);
storeRouter.post("/favourites",storeControllers.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId",storeControllers.postRemoveFromFavourite);

module.exports=storeRouter;