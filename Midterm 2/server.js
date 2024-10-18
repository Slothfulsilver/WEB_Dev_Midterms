//Setup for the Node+Express project
const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");


//GET and POST functions for the root

//Including the api call on the GET method for the root
app.route('/')
  .get(async (req, res) => {
    //Var with URL for API call
    var swCall = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/1.json`;

    await https.get(swCall, (response=>{
      console.log("Got a response from swCall");
      console.log(response.statusCode);
      
      var responseContent="";
      response.on("data", (data)=>{
        console.log(responseContent);
        responseContent += data;
      });
      
      response.on("end", ()=>{
          var jsonResp = JSON.parse
        (responseContent);

        var params = {
          jsonResp
        };
        
        console.log("SANDMAN");
        res.render("home", params);

      }).on("error", (e)=>{
        res.send("Error: $(e.message");
      });
    }));
  })

  .post((req, res) => {
    res.send();
  });


//Listening port 3000
app.listen(3000);