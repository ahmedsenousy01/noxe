const express = require('express');
const dbConnection = require('./utils/dbConnection');
const app = express();
const port = 3001;
app.use(express.json());

app.use('/user', require('./components/user/user.routes'));

app.listen(port, () => console.log(`app listening on port ${port}!`));
dbConnection();

