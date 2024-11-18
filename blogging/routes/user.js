const express = require('express');
const {handleSignup,handleLoginUser,handleSignupUser,handleSignInUser,handleLogoutUser} = require('../controller/user');

const route = express.Router();

route.get('/signup',handleSignup);
route.get('/login',handleLoginUser);
route.post('/signup',handleSignupUser);
route.post('/login',handleSignInUser);
route.get('/logout',handleLogoutUser);


module.exports = route;