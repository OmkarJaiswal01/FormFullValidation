const express=require('express');
const app = express();
const mongoose = require("mongoose");
const formModel = require('../Model/formModel');

const cors = require('cors');
app.use(express.json());
app.use(cors());


const db=mongoose.connect("mongodb://127.0.0.1:27017/prForm");
db.then(() => {
    console.log("Database is connected");
}).catch(() => {
    console.log("Database is not connected");
});

app.post("/form", async (req, res) => {
    const { name, phone, address, dob, pass,gender } = req.body;
    const model = new formModel({
        name, phone, address, dob, pass,gender
    });
// console.log( name, phone, address, dob, pass);
    try {
        const data = await model.save();
        res.status(200).json({
            message: "Data Saved",
            data,
            Error: false,
            Success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving data",
            Error: true,
            Success: false
        });
    }
});


app.post("/Login", async (req, res) => {
    const { name, pass } = req.body;

    try {
        // Find the user with the given name
        const user = await formModel.findOne({ name });

        // If user is found and password matches, login is successful
        if (user && user.pass === pass) {
            res.status(200).json({ message: "Login successful" });
        } else {
            // If user is not found or password doesn't match, login failed
            res.status(401).json({ message: "Login failed" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(7000,()=>{
    console.log("server started");
})