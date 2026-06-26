const mysql=require('mysql2');

const pool=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Princesql@3600",
  database:"airbnb"
});

module.exports=pool.promise();