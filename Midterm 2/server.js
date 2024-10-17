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
        //Initializing JSON character
        var character = {
          id: "NA",
          birth: "NA",
          death: "NA",
          name: "NA",
          gender: "NA",
          height: "NA",
          mass: "NA",
          homeWorld: "NA",
          affl: "NA",
          formAffl: "NA",
          image: "NA",
          masters: "NA",
          apprentices: "NA",
          linkWiki: "NA",
          skinColor: "NA",
    
          species: "NA",
         
          extra: []
      };


        if (i.id){character.id = i.id;}
        if (i.name){character.name = i.name;}
        if (i.gender){character.gender = i.gender;}
        if (i.height){character.height = i.height + " m";}
        if (i.image){character.image = i.image;}
        if (i.wiki){character.linkWiki = i.wiki;}
        if (i.species){character.species = i.species;}
        
        if (i.mass){character.mass = i.mass + " kg";}
        if (i.born){character.birth = i.born;}
        if (i.died){ character.death = i.died;}
        if(i.skinColor){character.skinColor = i.skinColor;}
        
        if (i.homeworld) {character.homeWorld = i.homeworld;}
        if (i.affiliations) {character.affl = i.affiliations;}
        if (i.formerAffiliations){ character.formAffl = i.formerAffiliations;}
        if (i.masters) {character.masters = i.masters;}
        if (i.apprentices) {character.apprentices = i.apprentices;}
        

        

        if(character.species == "wookiee"){
          if(i.hairColor){character.skinColor = i.hairColor + " hair";}
        }
        if(character.species == "droid"){
          if(i.platingColor){character.skinColor = i.platingColor;}
          if(i.dateDestroyed){character.death = i.dateDestroyed;}

          if(i.manufacturer){character.extra.push(`Manufacturer: ${i.manufacturer}`);}
          if(i.destroyedLocation){character.extra.push(`Destroyed Location: ${i.destroyedLocation}`);}
          if(i.class){character.extra.push(`Class: ${i.class}`);}
        }
        else{
          if(i.cybernetics){character.extra.push(`Cybernetics: ${i.cybernetics}`);}
          if(i.hairColor){character.extra.push(`Hair color: ${i.hairColor}`);} 
          if(i.eyeColor){character.extra.push(`Eye Color: ${i.eyeColor}`);}
        }

        if(character.birth != "NA"){
          if(character.birth < 0){
            character.birth = String(-1*parseInt(character.birth)) + " BBY";
          }
          else{
            character.birth = character.birth + " ABY";
          }
        }

        if(character.death != "NA"){
          if(character.death < 0){
            character.death = String(-1*parseInt(character.death)) + " BBY";
          }
          else{
            character.death = character.death + " ABY";
          }
        }
      
      //Introducing the character
      arrCharacters.push(character);
        
      };

      console.log(arrCharacters);

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