const express = require("express");
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();

// Enable CORS with specific origin and credentials enabled
app.use(cors({
    origin: ['http://localhost:3000'], // Allow the React frontend's origin
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies to be sent
  }));

// Enable JSON parsing and body parsing middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes
app.get("/home", (req, res) => {
    res.cookie('collab', 'pradeep', { 
        httpOnly: true, 
        secure: false, // Set to true when using HTTPS
        sameSite: 'None' // For cross-origin cookies
    });

    res.json({cookie: 'pradeep', message: "hello world" });
});

app.get("/", async (req, res) => {
    console.log("Received request for /");
    console.log("Cookies: ", req.cookies); // Log all cookies
    const cookieValue = req.cookies.collab || "No cookie found";
    console.log("Cookie value: ", cookieValue);
    res.status(200).json({ message: cookieValue });
});


app.get("/hi", async (req, res) => {
    console.log("hi");
    const cookie = await req.cookies["collab"];
    console.log(" hi :");
    console.log(await cookie);
    res.status(200).json({"cookie ":cookie});
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(5000,'0.0.0.0', () => {
    console.log("Server is running on port 5000");
});