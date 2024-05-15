import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT;
const mongoDBUri = process.env.mongoDBUri;
const DBNAME = process.env.DBNAME;
import mongoose from 'mongoose';
import cors from 'cors';
import router from './Routes/products.js'
import user from "./Routes/users.js";
import isAuth from './Middleware/auth.js';
import order from "./Routes/orders.js"

const app = express()


// Middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    allowedHeaders: ["Authorization", "Content-Type", "Accept"],
    exposedHeaders: ["*"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));

// Middleware for CORS
app.use(bodyParser.json());

app.use("/products", router);
app.use("/users", user);
app.use("/orders", order);
app.use(isAuth);

async function connectToMongoDB() {
  try {
      await mongoose.connect((mongoDBUri), { 
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          dbName: DBNAME
      });
      console.log('Express app connected to MongoDB');
      app.listen(PORT, () => {
          console.log(`Express app listening on port ${PORT}`)
      })            
  } catch (error) {
      console.error('Could not connect to MongoDB', error);
  }
}    

connectToMongoDB();