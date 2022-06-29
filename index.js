require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/keys');
const mongoose = require('mongoose');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
  
require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');
require('./models/Business');
require('./models/Product');
require('./models/Customer');
require('./models/User');
require('./models/Category');
require('./models/Cart');
require('./models/Order');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


//Fulfillment
require('./fulfillment/fulfillment')(app);
require('./fulfillment/product.fulfillment')(app);

//Routes
require('./routes/dialogFlow.routes')(app);
require('./routes/product.routes')(app);
require('./routes/user.routes')(app);
require('./routes/business.routes')(app);
require('./routes/customer.routes')(app);
require('./routes/category.routes')(app);
require('./routes/cart.routes')(app);
require('./routes/order.routes')(app);
require('./routes/auth.routes')(app);

// if (process.env.NODE_ENV === 'production') {
//     // js and css files
//     app.use(express.static('client/build'));

//     // index.html for all page routes
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT);