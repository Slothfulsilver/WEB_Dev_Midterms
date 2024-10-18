//Setup for the Node+Express project
const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//Global list with all characters
var arrCharacters = [];
var foundCharacters = [];

//GET and POST functions for the root

//Including the api call on the GET method for the root
app.route('/')
  .get(async (req, res) => {
    //Var with URL for API call
    var swCall = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`;

    arrCharacters = [];
    //API CALL
    await https.get(swCall, (response=>{
      console.log("Got a response from swCall");
      console.log(response.statusCode);
      
      //Receiving API data
      var responseContent="";
      response.on("data", (data) => {
        console.log(responseContent);
        responseContent += data;
      });

      
      //When all data is received
      response.on("end", ()=>{
          var jsonResp = JSON.parse
        (responseContent);

      //Getting info for all characters
      for(let i of jsonResp){

        //Initializing JSON type Character
        var character = {
          //Must have parameters
          id: "NA",
          name: "NA",
          gender: "NA",
          height: "NA",
          image: "NA",
          linkWiki: "NA",
          species: "NA",

          //Should but may have parameters
          mass: "NA",
          birth: "NA",
          death: "NA",
          skinColor: "NA",
          
          //May not have parameters
          homeWorld: "NA",
          affl: "NA",
          formAffl: "NA",
          masters: "NA",
          apprentices: "NA",
    
          //EXTRA
          extra: []
      };

        //All parameters every charachter should have
        if (i.id){character.id = i.id;}
        if (i.name){character.name = i.name;}
        if (i.gender){character.gender = i.gender;}
        if (i.height){character.height = i.height + " m";}
        if (i.image){character.image = i.image;}
        if (i.wiki){character.linkWiki = i.wiki;}
        if (i.species){character.species = i.species;}
        
        //Parameters characters should have but they may not have
        if (i.mass){character.mass = i.mass + " kg";}
        if (i.born){character.birth = i.born;}
        if (i.died){ character.death = i.died;}
        if(i.skinColor){character.skinColor = i.skinColor;}
        
        //Less likely parameters for every character it would be awesome for them to have
        if (i.homeworld) {character.homeWorld = i.homeworld;}
        if (i.affiliations) {character.affl = i.affiliations;}
        if (i.formerAffiliations){ character.formAffl = i.formerAffiliations;}
        if (i.masters) {character.masters = i.masters;}
        if (i.apprentices) {character.apprentices = i.apprentices;}
        

        
        //Special treatment of characteristics for wookiees
        if(character.species == "wookiee"){
          if(i.hairColor){character.skinColor = i.hairColor + " hair";}
        }
        //Special treatment of characteristics for droids
        if(character.species == "droid"){
          if(i.platingColor){character.skinColor = i.platingColor;}
          if(i.dateDestroyed){character.death = i.dateDestroyed;}

          //Special treatment of characteristics for droid extras
          if(i.manufacturer){character.extra.push(`Manufacturer: ${i.manufacturer}`);}
          if(i.destroyedLocation){character.extra.push(`Destroyed Location: ${i.destroyedLocation}`);}
          if(i.class){character.extra.push(`Class: ${i.class}`);}
        }
        else{
          //Adding extras for every species except droids
          if(i.cybernetics){character.extra.push(`Cybernetics: ${i.cybernetics}`);}
          if(i.hairColor){character.extra.push(`Hair color: ${i.hairColor}`);} 
          if(i.eyeColor){character.extra.push(`Eye Color: ${i.eyeColor}`);}
        }

        //Turning year of birth into a cannonically accurate format
        if(character.birth != "NA"){
          if(character.birth < 0){
            character.birth = String(-1*parseInt(character.birth)) + " BBY";
          }
          else{
            character.birth = character.birth + " ABY";
          }
        }

        //Turning year of death into a cannonically accurate format
        if(character.death != "NA"){
          if(character.death < 0){
            character.death = String(-1*parseInt(character.death)) + " BBY";
          }
          else{
            character.death = character.death + " ABY";
          }
        }
      
      //Introducing the character into the character array
      arrCharacters.push(character);
        
      };

      //Revising that the data was well inserted
      console.log(arrCharacters);
      console.log(arrCharacters.length);

      var params = {
          jsonResp,
          arrCharacters
        };

        
        //Rendering home
        res.render("home", params);

      }).on("error", (e)=>{
        res.send("Error: $(e.message");
      });
    }));
  })

  //POST method for root
  .post((req, res) => {
    res.send();
  });


//Making route /search for the character search bar
app.route('/search')
  .get((req, res)=>{
    var name = req.query.uName;
    console.log(`Characters found: ${foundCharacters.length}`)
    //If there are any characters found, render the found ejs
    if(foundCharacters.length > 0){
      var params = {
        foundCharacters,
        name
      };

      console.log("Redirecting to found");

      //Rendering found in views
      res.render("found", params);
    }
    //If not, then redirect to root WE HAVE TO REDIRECT TO NOT FOUND PAGE
    else{
      var params = {
        name
      };

      console.log("Redirecting to not-found");
      
      //Rendering not-found in views
      res.render("not-found", params);
    }
  })
  .post((req, res)=>{
    //Splitting into a list the input name
    var uName = req.body.name;
    var name = req.body.name.split(' ');
    foundCharacters = [];
    
    //Checking all the registered characters names and/or lastnames
    for (let i = 0; i < arrCharacters.length; i++) {
      var n = arrCharacters[i].name.split(' ');
      //Analizing the length of the input name list
      if(name.length > 1){
        //Analizing the length of the arrCharacter name
        if (n.length > 1){
          //If either name or last name of either input name or arrCharacter name matches, push to foundCharacters
          if (n[0].toLowerCase() === name[0].toLowerCase() || n[1].toLowerCase() === name[1].toLowerCase() || n[1].toLowerCase() === name[0].toLowerCase() || n[0].toLowerCase() === name[1].toLowerCase()) { 
            foundCharacters.push(arrCharacters[i]);
          }
        }
        else{
          //If name of input matches name or last name of arrCharacter, push to foundCharacters
          if (n[0].toLowerCase() === name[0].toLowerCase() || n[0].toLowerCase() === name[1].toLowerCase()) {
            foundCharacters.push(arrCharacters[i]);
          }
        }
      }
      else{
        //Analizing the length of the arrCharacter name
        if (n.length > 1){
          //If either name or last arrCharacter matches name of input, push to foundCharacters
          if (n[0].toLowerCase() === name[0].toLowerCase() || n[1].toLowerCase() === name[0].toLowerCase()) { 
            foundCharacters.push(arrCharacters[i]);
          }
        }
        else{
          //If name of arrCharacter matches name of input, push to foundCharacters
          if (n[0].toLowerCase() === name[0].toLowerCase()) { 
              foundCharacters.push(arrCharacters[i]);
          }
        }
      }
    }

    //Redirecting to the GET function of the same route (/search) with "name" as a query parameter
    res.redirect(`/search?name=${uName}`);
  });


//Listening port 3000
app.listen(3000);