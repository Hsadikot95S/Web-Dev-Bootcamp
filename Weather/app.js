const express= require("express");
const https =require("https");
const parser=require("body-parser")
const app=express();
app.use(parser.urlencoded({extended:true}));

app.get("/",function (req,res)
{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function (req,res)
{
    console.log(req.body.CityName)
    const query=req.body.CityName;
    const key="975b3b384a81016c5e4472fd3aabec0b";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + key + "&Units=" + unit ;
    https.get(url,function (response)
    {
        console.log(response.statusCode);

        response.on("data",
            function (data) {
                const Data = JSON.parse(data)
                const temp = Math.floor((Data.main.temp - 273.15)*100)/100
                const description = Data.weather[0].description
                const icon = Data.weather[0].icon
                const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p> The Weather is Currently " + description + "<p>");
                res.write("<h1> The temperature in " + query + " is " + temp + " degree Celsius.</h1>");
                res.write("<img src=" + image + ">");
                res.send()

            })

    })
});




app.listen(3000,function()
{
    console.log("Server is running on Port 3000");
})

