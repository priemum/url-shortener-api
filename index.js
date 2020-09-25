require("dotenv").config();

const express    = require("express");
const mongoose   = require("mongoose");
const app        = express();
const bodyParser = require("body-parser");
const PORT       = process.env.PORT || 80;
const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener";
const apiRouter  = require("./routes/index");
const cors       = require("cors");

mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if(err) return console.log(`MONGOOSE ERR: ${err}`);
        console.log("App successfully connected to mongoose.");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", apiRouter);



app.listen(PORT, () => {
        console.log(`App is on port ${PORT}`);
});