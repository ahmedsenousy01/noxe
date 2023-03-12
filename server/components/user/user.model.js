const { Schema, model } = require("mongoose");
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      trim: true,
      unique: [true, "email must be unique"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "minlength 6 characters"],
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 80
    }
  }
);
module.exports = model("user", schema);
