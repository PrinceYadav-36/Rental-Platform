require('dotenv').config();

const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;

const Mongo_URL = process.env.MONGO_URL;

let _db;
const mongoConnect=(callback)=>{
  MongoClient.connect(Mongo_URL).then(client=>{
 // console.log(client);
  _db=client.db('stayease');
  callback();
}).catch(err=>{
  console.log('Error while connecting to Mongo: ',err);
});
}

const getDB=()=>{
  if(!_db)
  {
    throw new Error('Mongo not connected');
  }
  return _db;
}
exports.mongoConnect=mongoConnect;
exports.getDB=getDB;