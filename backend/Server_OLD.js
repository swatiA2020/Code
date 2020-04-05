var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var m     =   require("./model/mongo");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.route("/aer")
    .get(function(req,res){
        response = {};
        m.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        if(err) {
               response = {"error" : true,"message" : "Error fetching data"};
            } else {
               response = {"error" : false,"message" : data};
            }
            res.json(response);
            });
    });

router.route("/aer/1").get(function(req,res){
m.aggregate([
    {  "$group": {
        "_id": "$user",
        "count": { "$sum": 1 }
    } },
    { "$sort": { "_id": 1 } },
    {  "$group": {
        "_id": null,
        "counts": {
            "$push": {
                "k": "$_id",
                "v": "$count"
            }
        }
    } },
    { "$replaceRoot": {
        "newRoot": { "$arrayToObject": "$counts" }
    } }    
], function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.json(result)
    }

})


});

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
