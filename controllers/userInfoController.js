'use strict';
const UserInfo = require( '../models/userInfo' );
console.log("loading the userInfo Controller")


// this displays all of the users and their information
exports.getAllUserInfo = ( req, res ) => {
  console.log('in getAllUserInfo')
  UserInfo.find( {} )
    .exec()
    .then( ( userInfo ) => {
      res.render( 'userInfo', {
        userInfo: userInfo
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'userInfo promise complete' );
    } );
};

exports.saveUserInfo = ( req, res ) => {
  console.log("in saveUserInfo!")
  console.dir(req)
  let newUser = new userInfo( {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  } )

  console.log("user = "+ newUser)

  newUser.save()
    .then( () => {
      res.redirect( '/userInfo' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteUserInfo = (req, res) => {
  console.log("in deleteUserInfo")
  let userName = req.body.deleteName
  if (typeof(userName)=='string') {
      UserInfo.deleteOne({name:userName})
           .exec()
           .then(()=>{res.redirect('/userInfo')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(userName)=='object'){ //if it's a list
      UserInfo.deleteMany({name:{$in:userName}})
           .exec()
           .then(()=>{res.redirect('/userInfo')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(userName)=='undefined'){
      console.log("This is if they didn't select their name")
      res.redirect('/userInfo')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown userName: ${userName}`)
  }
};
