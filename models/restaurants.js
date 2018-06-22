'use strict';
var mongoose = require( 'mongoose' );

var restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  food_type: String
});

module.exports = mongoose.model( 'restaurants', restaurantSchema );
