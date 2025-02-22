// Import dependencies
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import ContactRouter from './Routes/Contact.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

//when conntect backend to frontend 
//cors
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
    allowedHeaders: ["Content-Type", "application/json"]
}))

// Define PORT
const PORT = process.env.PORT || 5000;


//connecting mongodb
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'MERN_API_Tutorial'
})
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log(err))

// Middleware (if any) goes here


// Routes (if any) go here
// contacts router
app.use('/api', ContactRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
