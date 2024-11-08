const user = require("../models/user");

async function handleSignup(req, res) {
  return res.render("signup");
}

async function handleLoginUser(req, res) {
  return res.render("login");
}

async function handleSignupUser(req, res) {
  const { fullName, email, password } = req.body;
  await user.create({ fullName, email, password });
  return res.redirect("/");
}

async function handleSignInUser(req,res){
  const {email, password } = req.body;
  const isMatchedUser = user.matchPassword(email, password);
  if(isMatchedUser) {
    console.log("user",isMatchedUser.fullName);
  }
  return res.redirect("/"); // redirect to home page or login page
}

module.exports = { handleSignup, handleLoginUser, handleSignupUser,handleSignInUser };
