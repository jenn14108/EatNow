//fetch data from Yelp API
'use strict'
const axios = require('axios');
const yelp = require('yelp-fusion');
const yelpClientID = process.env.YELPCLIENTID;
const yelpAPIKey = process.env.YELPAPIKEY;
const bodyParser = require('body-parser');
var restaurantName; var restaurantLocation;
var yelpLink; var googleQuery;
var allRestaurants; var resultLength;
var pickedNums = [];
var ranOut = false;

exports.renderMain = (req, res) => {
  if (ranOut == true) {
    var response = "Unfortunately, we ran out of suggestions :(";
    res.render('Results', {title:"Results", name:response,
                            ranOut: ranOut});
  } else {
    res.render('Results', {title: "Results", name:restaurantName,
                          location: restaurantLocation, yelpLink:yelpLink,
                          googleQuery: googleQuery, ranOut: ranOut});
  }
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
      pickedNums.push(pickedNum);
      console.log("LENGTH");
      console.log(resultLength);
      console.log("FIRST PICKED NUMBER:");
      console.log(pickedNum);
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
};

exports.findAnotherRestaurant = (req,res,next) => {
  console.log('finding another restaurant...');
  if (pickedNums.length == resultLength){
    ranOut = true;
    next();
  } else {
    // console.log("THIS IS THE LENGTH: ");
    // console.log(resultLength);
    var pickedNum;
    var picked = true;
    while (picked) {
      picked = false;
      pickedNum = Math.floor(Math.random() * ((resultLength-1) - 0 + 1)) + 0;
      for (var i = 0; i < pickedNums.length; i++){
        if ((pickedNum == pickedNums[i])){
          picked = true;
        }
      }
      if (picked) {
        pickedNum = Math.floor(Math.random() * (resultLength - 0 + 1)) + 0;
      } else {
        pickedNums.push(pickedNum);
      }
    }
    // console.log("FINAL PICK: ");
    // console.log(pickedNum);
    const pickedRestaurant = allRestaurants[pickedNum];
    //console.log(pickedRestaurant);
    restaurantName = pickedRestaurant.name;
    restaurantLocation = pickedRestaurant.location.display_address[0] + "\n" +
                          pickedRestaurant.location.display_address[1];
    yelpLink = pickedRestaurant.url;
    googleQuery = restaurantName.replace(/\s/g, "+") + "+"
                  + restaurantLocation.replace(/\s/g, "+");
    next();
  };
};
