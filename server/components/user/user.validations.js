const Joi = require("joi");

const validateUserObject = (userToValidate) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).required(),
    confirmPassword: Joi.ref('password'),
    age: Joi.number().min(18).max(60)
  });
  const { error } = schema.validate(userToValidate);
  return error;
};

module.exports = {
  validateUserObject
}