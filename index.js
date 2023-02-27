const express = require("express");
const app = express();
const HOSTNAME = "192.168.0.102";
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/test.html");
});

app.get("/data", (req, res) => {
    res.sendFile(__dirname + "/example.json");
});

app.get("/load/register", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var l = `
  
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            transition: all 1s;
        }
        .loader-container {
            background-color: #000000;
            color: gold;
            /*display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;*/
            font-size: 20px;
            height: 100vh;
            overflow: hidden;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            animation: font-opacity-down-up 1s;
            animation-delay: 1s;
            animation-iteration-count: initial;
        }
        .loader {
            animation: a1 1s;
            animation-delay: 3s;
            animation-iteration-count: infinite;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 0 0 5px 0 gold;
            
            position: fixed;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        @keyframes a1 {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0.1;
            }
        }

        @keyframes font-opacity-down-up {
            0% {
                font-size: 20px;
            }
            50% {
                font-size: 30px;
            }
            100% {
                font-size: 20px;
            }
        }
    </style>
</head>

<body class="loader-container">
    <h1 class="loader">MINISOTE</h1>
    <script>
            function loadDoc(x) {
                const xhttp = new XMLHttpRequest();
                xhttp.onload = function() {
                    var data = this.responseText;
                     document.querySelector("*").innerHTML = data;
                }
                xhttp.open("GET", x);
                xhttp.send();
            }
            setTimeout(() => {loadDoc("https://rafid.up.railway.app/load/register")}, 0);
    </script>
</body>

</html>`;

app.get("/register", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body class="loader-container">
<script>
 function loadDoc(x) {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function(){ document.querySelector("*").innerHTML = this.responseText;}
     xhttp.open("GET", x);
     xhttp.send();
 }
 loadDoc("https://rafid.up.railway.app/load/register");
</script>
</body>
</html>
  `);
});

app.post("/register", (req, res) => {
  const bg = req.body.bg;
  res.send(`
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
      *{
        background-image: url('https://i.pinimg.com/originals/2e/9c/68/2e9c6878eae5bbcdaa2d07ed4dbd79b8.gif');
        background-position: center;
        background-attachment: fixed;
        background-size: 50%;
        background-repeat: no-repeat;
        background-color: #222222;
      }
@media only screen and (max-width: 600px) {
  * {
    background-size: 100%;
  }
}
    </style>
</head>
<body>
  <h2>BG: ${bg}</h2>
  <script>/*location.replace("https://rafid.up.railway.app/register")*/history.back();</script>
  `);
  let x = `
  {
    "bg": "${bg}" 
  }
  `;
  fs.writeFile('example.json', x, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});
