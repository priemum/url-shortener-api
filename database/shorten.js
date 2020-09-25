const {Schema, model} = require("mongoose");

const ShortenSchema = new Schema({
        url:    {type: String, required: true, unique: true},
        author: {type: String, required: true},
        key:    {type: String, required: true},
        visits: {type: Number, default: 0}
});

module.exports = model("Shorten", ShortenSchema, "shortens");
