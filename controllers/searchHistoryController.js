'use strict';
const searchHistory = require( '../models/searchHistory' );
console.log("loading the searchHistory Controller")


// this displays all of the users and their information
exports.getAllSearchTerms = ( req, res ) => {
  console.log('in getAllSearchTerms')
  searchHistory.find( {} )
    .exec()
    .then( (searchHistory) => {
      console.log(`searchHistory=${searchHistory}`)
      res.render( 'search', {
        //userInfo: userInfo
        searchHistory:searchHistory
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'searchHistory promise complete' );
    } );
};

exports.saveSearchTerm = ( req, res ) => {
  console.log("in saveSearchTerm!!!!!!");
  let newSearchTerm = new searchHistory( {
    term: req.body.term
  })
  console.log(newSearchTerm);
  newSearchTerm.save()
    .then( () => {
      res.redirect('/getRestaurant?data=' + newSearchTerm.term);
      //next();
    } )
    .catch( error => {
      res.send( error );
    } );
};
