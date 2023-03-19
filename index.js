/**
 * Headers
 */
const express = require('express')
const bodyParser = require('body-parser');
const port = 1337;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
/**
 * Code Body
 */

const connectDb = require ('./config/db'); // import 
connectDb();

// Route
app.use('/', require('./routes/router'));

/**
 * Server listner
 */
app.listen(port, () => {
  console.log(`App opened at port > ${port}!`)
});


