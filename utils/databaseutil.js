const mongo=require('mongodb');

const MongoClient=mongo.MongoClient;

const Mongo_URL="mongodb+srv://princekohli3621_db_user:Prince%403600@princemongo.wpt315m.mongodb.net/?appName=PrinceMongo";

let _db;
const mongoConnect=(callback)=>{
  MongoClient.connect(Mongo_URL).then(client=>{
  console.log(client);
  callback();
  _db=client.db('stayease');
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