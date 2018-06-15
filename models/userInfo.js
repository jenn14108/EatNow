'use strict';
const mongoose = require( 'mongoose' );

var userInfoSchema = mongoose.Schema( {
  email: String,
  username: String,
  password: String
} );

module.exports = mongoose.model( 'userInfo', userInfoSchema );
