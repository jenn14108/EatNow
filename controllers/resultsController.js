//fetch data from Zomato API https://developers.zomato.com/api#headline2
'use strict'
const axios = require('axios');
const yelp = require('yelp-fusion');
const yelpClientID = process.env.YELPCLIENTID;
const yelpAPIKey = process.env.YELPAPIKEY;
const bodyParser = require('body-parser');
var restaurantName;
var restaurantLocation;

exports.renderMain = (req, res) => {
  res.render('Results', {title: "Results", name:restaurantName, location: restaurantLocation});
};

exports.yelpFindRestaurant = (req,res,next) => {
  const searchRequest = {
    term: req.body.term,
    location: req.body.location,
    radius: 4500
  };

  const client = yelp.client(yelpAPIKey);

  client.search(searchRequest)
    .then(response => {
      var resultLength = response.jsonBody.businesses.length;
      var pickedNum = Math.floor(Math.random() * (resultLength - 0 + 1)) + 0;
      const pickedRestaurant = response.jsonBody.businesses[pickedNum];
      //console.log(response.jsonBody.businesses);
      //console.log(firstResult);
      //const prettyJson = JSON.stringify(firstResult, null, 4)
      //console.log(prettyJson);
      restaurantName = pickedRestaurant.name;
      restaurantLocation = pickedRestaurant.location.display_address[0] + "\n" +
                            pickedRestaurant.location.display_address[1];
      console.log(restaurantName);
      console.log(restaurantLocation);
      next();
    })
    .catch(err => {
      console.log(err);
  });
}
