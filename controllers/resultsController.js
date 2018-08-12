//fetch data from Zomato API https://developers.zomato.com/api#headline2
'use strict'
const axios = require('axios');
const yelp = require('yelp-fusion');
const yelpClientID = process.env.YELPCLIENTID;
const yelpAPIKey = process.env.YELPAPIKEY;
const bodyParser = require('body-parser');
var restaurantName;
var restaurantLocation;
var yelpLink;
var googleQuery;
var allRestaurants; var resultLength;

exports.renderMain = (req, res) => {
  res.render('Results', {title: "Results", name:restaurantName,
                        location: restaurantLocation, yelpLink:yelpLink,
                        googleQuery: googleQuery});
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
      resultLength = response.jsonBody.businesses.length;
      var pickedNum = Math.floor(Math.random() * (resultLength - 0 + 1)) + 0;
      const pickedRestaurant = response.jsonBody.businesses[pickedNum];
      //console.log(pickedRestaurant);
      //const prettyJson = JSON.stringify(firstResult, null, 4)
      //console.log(prettyJson);
      allRestaurants = response.jsonBody.businesses;
      restaurantName = pickedRestaurant.name;
      restaurantLocation = pickedRestaurant.location.display_address[0] + "\n" +
                            pickedRestaurant.location.display_address[1];
      yelpLink = pickedRestaurant.url;
      googleQuery = restaurantName.replace(/\s/g, "+") + "+"
                    + restaurantLocation.replace(/\s/g, "+");
      // console.log(googleQuery);
      // console.log(restaurantName);
      // console.log(restaurantLocation);
      next();
    })
    .catch(err => {
      console.log(err);
  });
}

exports.findAnotherRestaurant = (req,res,next) => {
  console.log('finding another restaurant...');
  console.log(resultLength)
  var pickedNum = Math.floor(Math.random() * (resultLength - 0 + 1)) + 0;
  console.log(pickedNum);
  const pickedRestaurant = allRestaurants[pickedNum];
  console.log(pickedRestaurant);
  restaurantName = pickedRestaurant.name;
  restaurantLocation = pickedRestaurant.location.display_address[0] + "\n" +
                        pickedRestaurant.location.display_address[1];
  yelpLink = pickedRestaurant.url;
  googleQuery = restaurantName.replace(/\s/g, "+") + "+"
                + restaurantLocation.replace(/\s/g, "+");
  next();
}
