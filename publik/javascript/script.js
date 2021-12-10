
let jsonText = '{"date": "2021-12-06T19:06<br>","namn": "Margarita<br>","efternamn": "Jarovaja<br>","email": "nord.ferro@gmail.com<br>","meddelande": "Poka!<br>"}'; 
let object = JSON.parse(jsonText); 
 
let hamtaData = function() {
    let forfragan = new XMLHttpRequest();  
    forfragan.open("GET", "/hamta-json"); 
    forfragan.onload = function() {                  
        data = JSON.parse(this.response);  
        console.log(data);
        for (let i = 0; i < data.length; i++) { 
            for (attribut in data[i]) {
                document.getElementById("output").innerHTML += data[i][attribut] + " ";
            };
            document.getElementById("output").innerHTML += "<br>";
        };
    };

    forfragan.send();                      
};

window.onload = function() {
    
    hamtaData();
};