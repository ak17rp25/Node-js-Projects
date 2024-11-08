const express = require('express');
const {handleSignup,handleLoginUser,handleSignupUser,handleSignInUser} = require('../controller/user');

const route = express.Router();

route.get('/signup',handleSignup);
route.get('/login',handleLoginUser);
route.post('/signup',handleSignupUser);
route.post('/login',handleSignInUser);


module.exports = route;