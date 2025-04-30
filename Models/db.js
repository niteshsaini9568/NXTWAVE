// db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.Mongo_url;

mongoose.connect(mongo_url)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
