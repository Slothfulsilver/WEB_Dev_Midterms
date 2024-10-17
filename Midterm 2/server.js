//Setup for the Node+Express project
const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//Global list with all characters
var arrCharacters = [];


//GET and POST functions for the root

//Including the api call on the GET method for the root
app.route('/')
  .get(async (req, res) => {
    //Var with URL for API call
    var swCall = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`;
    
    var character = {
      id: "",
      birth: "",
      death: "",
      name: "",
      gender: "",
      height: "",
      mass: "",
      homeWorld: "",
      affl: "",
      formAffl: "",
      image: "",
      masters: "",
      apprentices: "",
      linkWiki: "",

      species: "",
      
      manModel: "",
     
      extra: ""
  };
    

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

      for(let i of jsonResp){
        character.id = i.id;
        //character.birth = i.birth;
        //character.death = i.death;
        character.name = i.name;
        character.gender = i.gender;
        character.height = i.height;
        character.mass = i.mass;
        character.homeWorld = i.homeworld;
        character.affl = i.affiliations;
        character.formAffl = i.formerAffiliations;
        character.image = i.image;
        character.masters = i.masters;
        character.apprentices = i.apprentices;
        character.linkWiki = i.wiki;

        character.species = i.species;

        if(character.species == "wookie"){}
        if(character.species == "droid"){}
        
        character.manModel = i.manModel;
        character.extra = i.extra;
      };

      var params = {
          jsonResp,
          arrCharacters
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