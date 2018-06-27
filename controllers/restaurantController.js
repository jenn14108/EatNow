//this database is already pre-filled. Users with an
//account can add to it
'use strict';
const RestaurantInfo = require('../models/restaurant.js');
console.log("loading the restaurant controller");
//this saves a restaurant input by the user


// this displays all of the users and their information
exports.getAllRestaurants = ( req, res ) => {
  console.log('in getAllRestaurants')
  RestaurantInfo.find( {} )
    .exec()
    .then( (restaurants) => {
      console.log(`restaurants=${restaurants}`)
      res.render( 'addRestaurants', {
        restaurants:restaurants
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'restaurant promise complete' );
    } );
};

//This displays one restaurant that matches querying results
exports.saveRestaurant = (req, res) => {
  console.log("in saveRestaurant!");
  console.dir(req);
  let newRestaurant = new RestaurantInfo({
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
