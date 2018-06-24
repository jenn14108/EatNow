//this database is already pre-filled. Users with an
//account can add to it
'use strict';
const RestaurantInfo = require('../models/restaurants.js');
console.log("loading the restaurant controller");

//this saves a restaurant input by the user


//This displays one restaurant that matches querying results
exports.saveRestaurant = (req, res) => {
  console.log("in saveRestaurant!");
  console.dir(req);
  let newRestaurant = new Restaurant({
    name: req.body.name,
    location: req.body.location,
    food_type: req.body.food_type
  })

  newRestaurant.save()
    .then( () => {
      res.redirect('/addRestaurants');
    })
    .catch( error => {
      res.send(error);
    });
};

exports.getRestaurant = (req, res) => {
  console.log("in getRestaurant!");
  let userFoodType = req.body.food_type
  if (typeof(userRestaurant) =='string'){
    RestaurantInfo.findOne({food_type:userFoodType})
      .exec()
      .then(() => {res.redirect('/results')})
      .catch((error) => {res.send(error)})
  }
};
