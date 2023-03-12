const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/login-and-registration')
    .then(() => console.log('connection established'))
    .catch(err => console.log(err));
}