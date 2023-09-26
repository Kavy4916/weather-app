import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;
const app = express();
const apiKey = "";
const url = "api.openweathermap.org/data/2.5/forecast/";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
var city = "jalandhar" 

app.get("/", async (req, res)=>{
  try{
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
  const forcastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`);
  res.render("index.ejs",{
    content: response.data,
    forcastContent: forcastResponse.data,
  });
}catch(error){
  console.log(error);
  res.status(500);
}
});

app.post("/city", async(req, res)=>{
  city = req.body["city"];
  try{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    const forcastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`);
    res.render("index.ejs",{
      content: response.data,
      forcastContent: forcastResponse.data,
    });
  }catch(error){
    console.log(error);
    res.status(500);
  }
});

app.get("/about", (req, res)=>{
  res.render("about.ejs");
});

app.get("/feedback", (req, res)=>{
  res.render("about.ejs");
});

app.listen(PORT, ()=>{
});
