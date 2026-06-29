const {getDB}=require("../utils/databaseutil");
const {ObjectId}=require('mongodb');

module.exports= class Favourite{
     constructor(houseId)
    {
      this.houseId=houseId;
    }

     save()
     {
      const db=getDB();
      return db.collection('favourites').findOne({houseId:this.houseId}).then(existFav=>{
        if(!existFav){
          return db.collection('favourites').insertOne(this);
        }
        return Promise.resolve();
      })
     }

      static getFavourites()
      {
        const db=getDB();
        return db.collection('favourites').find().toArray();
    }

    static deleteById(delhomeId)
    {
      const db=getDB();
      return db.collection('favourites')
      .deleteOne({houseId: delhomeId});
    }
}
