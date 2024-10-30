const express = require("express");
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Use CORS with specific origin and credentials enabled
app.use(cors({
    origin: 'http://localhost:3000', // Allow only requests from this origin
    credentials: true                // Allow credentials
}));

// Enable JSON parsing and body parsing middleware
app.use(express.json());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  
    database: process.env.DATABASE
});

db.connect();

// Define routes
app.get("/", (req, res) => {
    db.query("select username from accounts where username='pradeepdedsec'", async (err, results) => {
        if (err) {
            console.error(err);
            res.send("hello world");
        } else {
            res.send(JSON.stringify(results));
        }
    });
});

app.get("/home", (req, res) => {
    res.send("hello world");
});

// Start server
app.listen(5000, () => {
    console.log("server is running on port 3000");
});
