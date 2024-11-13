const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);


User.pre('save' , async function(next) {
    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password,10)
})

const User = ("User", userSchema);

module.exports = User;