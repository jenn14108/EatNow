'use strict';
var mongoose = require( 'mongoose' );

var userInfoSchema = new mongoose.Schema( {
  email: String,
  username: String,
  password: String
} );

module.exports = mongoose.model( 'userInfo', userInfoSchema );
