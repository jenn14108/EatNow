'use strict';
var mongoose = require( 'mongoose' );

var restaurantsSchema = new mongoose.Schema({
  name: String,
  location: String,
  food_type: String
});

var Restaurant = mongoose.model( 'restaurants', restaurantsSchema, 'restaurants');
module.exports = Restaurant;
