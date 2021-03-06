//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed"
        }]
    }
    const jsonData = JSON.stringify(data);
    const url = `https://us2.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`;

    const options = {
        method: "POST",
        auth: `CognizenClubNITR:${process.env.API_KEY}`
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    })

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at port 3000! ");

});

