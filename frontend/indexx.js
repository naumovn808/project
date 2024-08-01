
const express = require('express')
const app = express()
app.use(express.json())
const PORT = 4000

const mongoose = require("mongoose");
if (mongoose) {
    mongoose.connect("mongodb+srv://abduvalievabap:<28.09.2006>@cluster0.l6xymlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
} else {
    console.log('Db error');
}



const User = mongoose.model("User", {
    name: String,
    email: String,
    status: String,
});

app.listen(PORT, (error) => {
    error ? "App errors" : console.log(`Server started on port http://localhost:${PORT}`)
})