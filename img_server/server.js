const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Make sure this line is present
const { time } = require('console');

const app = express();
const port = 3000;


app.use(cors());  // Make sure this line is present
app.use(express.static('../public'));
app.get('/images', (req, res) => {
    let t = new Date()

    const imagesDir = path.join(__dirname, '../public/images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const images = files.map(file => `./images/${file}`);
        res.json(images);
        console.log(`-- `+ t +` --`)
        
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// node .\server.js
