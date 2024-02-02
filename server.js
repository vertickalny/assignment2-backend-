const express = require('express');
const path = require('path');
const {fileURLToPath} = require("url");

const app = express();
const port = process.env.PORT || 3000;


// Serve static files from the 'public' directory
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, "public")))


// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public"));
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
