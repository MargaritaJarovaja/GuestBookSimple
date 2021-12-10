//http://localhost:3000/form  (path)

const express = require("express");
const app = express();
app.use(express.static("publik"));
app.listen("3000");
console.log("Kör servern på localhost:3000");

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});


const fs = require("fs");
app.get("/hamta-json", (req, res) => {
    console.log("Mottog förfrågan med XMLHttpRequest från klienten");
    fs.readFile("messages.json", function(err, data) {
        if (err) throw err; 
        res.send(data);
    });
});


app.use(express.urlencoded({extended: true}));  
app.post("/skriv-fran-mall", (req, res) => {  
 
    fs.readFile("form.html", function(err, data){
        fs.readFile("messages.json", function(err, postJson) {
        
            let falt = JSON.parse(postJson);
            let date = new Date;
            let precisDate = date.toISOString();
            precisDate = precisDate.substring(0, 16);            

            let nyUser = {    // skapa ny user
                date: precisDate +'<br>',
                namn: req.body.name +'<br>',
                efternamn: req.body.surname +'<br>',
                email: req.body.email +'<br>',
                meddelande: req.body.meddelande +'<br>',
                string: '------------------------------'
            };

            console.log(nyUser);
            falt.push(nyUser);    // lägg till nya user            
            
            let nyJson = JSON.stringify(falt, null, 2);
            fs.writeFile("messages.json", nyJson, (err) => {
                if (err) throw err;
            });
            
            let output = "";           


            for (messages in falt) {
                for (attribut in messages) {
                    output += messages[attribut] + " ";
                };
                output += "<br>";
            };

            let html = data.toString().replace(output);
            res.send(html);

        });
    });
});
        