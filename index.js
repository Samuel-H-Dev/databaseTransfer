///-----------Importing MongoDB----------///
import { MongoClient } from 'mongodb';
import { mongoURI } from './secrets.js';

///-----------Importing mySQL2----------///
import mysql from 'mysql2';
import { mysqlConnect } from './secrets.js';

// Connecting to MySQL
const sqlDatabase = mysql.createConnection(mysqlConnect);

/// Connecting to MongoDB
const MongoDBName = 'c11-practice';
const collectionName = 'movieTransfer';

const mongoConnect = new MongoClient(mongoURI);
await mongoConnect.connect();

const mongoDB = mongoConnect.db(MongoDBName);
const collection = mongoDB.collection(collectionName);

// Get movies list from MySQL
const movieList = await new Promise((resolve, reject) => {
  sqlDatabase.query('SELECT * FROM movietable', (error, results) => {
    if (error) {
        console.log("error")
        reject(error);
    } else {
        console.log("results")
        resolve(results);
    }
  });
});

sqlDatabase.end();

// Insert movies into MongoDB
await collection.insertMany(movieList);

mongoConnect.close();
