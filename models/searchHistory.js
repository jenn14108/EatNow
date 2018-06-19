'use strict';
var mongoose = require( 'mongoose' );

var searchHistorySchema = new mongoose.Schema( {
  term: String,
} );

module.exports = mongoose.model( 'searchHistory', searchHistorySchema );
