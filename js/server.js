// Load dotenv variables
require('dotenv').config();

// Load requires
const express = require('express');


// Declare express app
const app = express();



// Declare your routes
// home route
app.get('/', (req, res) => {
  res.send('STUB ROUTE');
});

// location route
app.get('https://lab-06-sudip.herokuapp.com/location', (req, res) => {
  try{
    let location = require('../data/geo.json');
    console.log(location.results);
    let newLocation = new SearchLocation('seattle', 'Seattle, WA, USA', location.results[0].geometry.location.lat, location.results[0].geometry.location.lng);
    res.send(newLocation);
  }catch(error) {
    res.send(errorHandling(500, 'Something went wrong with getting the location'));
    console.log(`There's been an ERRRRRRRRRRor getting your location! ${error}`);
  }
});

// weather route
app.get('https://lab-06-sudip.herokuapp.com/weather', (req, res) => {
  try{
    let weather = require('../data/darksky.json');
    let dailyForecast = [];
    weather.daily.data.forEach((element) => {
      dailyForecast.push(new SearchWeather(element.summary, element.time));
    });
    res.send(dailyForecast);
  } catch(error) {
    res.send(errorHandling(500, 'Something went wrong with getting the weather'));
    console.log(`There's been an ERRRRRRRRRRor getting your weather! ${error}`);
  }
});

// Setup listener
app.listen(process.env.PORT || 8000, function(){
  console.log('Now listening to the smooth sounds of port 8000');
});


//constructor functions
function SearchLocation(locationName, formatted_query, lat, lng) {
  this.search_query = locationName;
  this.formatted_query = formatted_query;
  this.latitude = lat;
  this.longitutde = lng;
}

function SearchWeather(forecast, time){
  this.forecast = forecast;
  this.time = time;
}

// error handling function
const errorHandling = (status, responseText) => {
  let errorObj = {
    status: status,
    responseText: responseText
  };
  return errorObj;
};
