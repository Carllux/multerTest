const express = require('express');
const app = express()
const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        // note that in the second callback arg
        // we usually pass the name that we wanted to have 
        // as archive name
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })
console.log(storage)
const PORT = 3001

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload")
})

//  in upload.any() the param is the name of the place that we will use to upload the file 
//  in our case we will use avatar
app.post("/upload", upload.single('avatar'), (req, res) => {
    res.send("Image uploaded")
})

app.listen(`${PORT}`)
console.log(`The server listening on ${PORT}`)