const catchAsyncError = require("../../utils/catchAsyncError");
const userModel = require("./user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).required(),
  confirmPassword: Joi.ref('password'),
  age: Joi.number().min(18).max(60),
  phone: Joi.required()
});

const signup = catchAsyncError(
  async (req, res) => {
    const { name, email, password, confirmPassword, age, phone } = req.body;
    const { error } = schema.validate({ name, email, password, confirmPassword, age, phone });
    if (error) {
      res.json({ message: 'signup failed', errors: error.details })
    } else {
      const user = await userModel.findOne({ email });
      if (!user) {
        bcrypt.hash(password, 4, async (err, hash) => {
          console.log(err);
          await userModel.insertMany({ name, email, password: hash, age, phone });
        });
        res.json({ message: 'signup successful' });
      } else {
        res.json({ message: 'email already exists' });
      }
    }
  }
)

const signin = catchAsyncError(
  async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ name: user.name, id: user._id, role: 'user' }, 'senousy');
        res.json({ message: 'signin successful', token });
      } else {
        res.json({ message: 'password incorrect' });
      }
    } else {
      res.json({ message: 'signin failed' });
    }
  }
)


module.exports = {
  signup,
  signin
}