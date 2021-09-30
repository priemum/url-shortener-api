const router       = require("express").Router();
const ShortenModel = require("../database/shorten");
router.get("/:key", async (req, res) => {
        var {key} = req.params;
        var data  = await ShortenModel.findOneAndUpdate({key}, {$inc: {visits: 1}}, {useFindAndModify: true});
        if(data)    return res.status(200).json(data);
        else        return res.status(404).json({message: `The key you provided doesn't match any document in the database. [KEY: ${key}]`});
});

router.post("/:key", async(req, res) => {
        var {key} = req.params 
        if(!req.body.startsWith("http://") && !req.body.startsWith("https://")) req.body.url = `https://${req.body.url}`
        if(!req.body) return res.status(400).send(`URL must be sent in the request's body.`)
        res.send(await new ShortenModel({key, author: req.hostname, url: req.body.url}).save())
});

module.exports = router;
