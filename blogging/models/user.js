const mongoose = require("mongoose");

const { createHmac, randomBytes } = require("crypto");

const schema = new mongoose.Schema(
  {
    fullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    salt: {
      type: "string",
      default: ""
    },
    password: {
      type: "string",
      required: true,
    },
    profileImageUrl: {
      type: "string",
      default: "/blogging/public/images/avatar.png",
    },
    role: {
      type: "string",
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

schema.pre("save", function (done) {
  const user = this;
  
  const password = user.password;
  console.log(user.isModified(password));
  if (!user.isModified("password")) {
    return;
  }
  const salt = randomBytes(16).toString();
  
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashPassword;
  done();
});

schema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({email});
  if (!user) {
    return null;
  }
  const salt = user.salt;
  const hashPassword = user.password;
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
  console.log(user);
  if(hashPassword === hashedPassword){
    return (user);
  }
})
const model = mongoose.model("User", schema);

module.exports = model;
