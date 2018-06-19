'use strict';
const UserInfo = require( '../models/userInfo' );
console.log("loading the userInfo Controller")


// this displays all of the users and their information
exports.getAllUserInfo = ( req, res ) => {
  console.log('in getAllUserInfo')
  UserInfo.find( {} )
    .exec()
    .then( (userInfo) => {
      console.log(`userInfo=${userInfo}`)
      res.render( 'signUp', {
        //userInfo: userInfo
        info:userInfo
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
  console.log("in saveUserInfo!");
  console.dir(req);
  let newUser = new UserInfo( {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })

  console.log(req.body.email)
  console.log(req.body.username)
  console.log(req.body.password)

  newUser.save()
    .then( () => {
      res.redirect( '/signUp' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteUserInfo = (req, res) => {
  console.log("in deleteUserInfo")
  let userEmail = req.body.deleteEmail
  if (typeof(userEmail)=='string') {
      UserInfo.deleteOne({email:userEmail})
           .exec()
           .then(()=>{res.redirect('/signUp')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(userEmail)=='object'){ //if it's a list
      UserInfo.deleteMany({email:{$in:userEmail}})
           .exec()
           .then(()=>{res.redirect('/signUp')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(email)=='undefined'){
      console.log("This is if they didn't select their email")
      res.redirect('/signUp')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown email: ${userEmail}`)
  }
};
