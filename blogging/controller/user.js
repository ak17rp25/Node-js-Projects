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
  const token = await user.matchPassword(email, password);
  if(token){
    return res.cookie('token', token).redirect("/");
  }
  return res.status(404).send({message: "Could not find post."});
}

async function handleLogoutUser(req, res) {
  res.clearCookie("token");
  return res.redirect("/");
}

module.exports = { handleSignup, handleLoginUser, handleSignupUser,handleSignInUser,handleLogoutUser };
