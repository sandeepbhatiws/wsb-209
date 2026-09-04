const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

// To Make Executable
const server = express();

server.use(bodyParser.json());
server.use(cors());

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use('/uploads', express.static('uploads'));

server.get('/', (request, response) => {
    response.send('Server is working fine !')
})

// Admin APIS
require('./src/routes/admin/default.routes.js')(server);
require('./src/routes/admin/material.routes.js')(server);
require('./src/routes/admin/color.routes.js')(server);
require('./src/routes/admin/category.routes.js')(server);
require('./src/routes/admin/subCategory.routes.js')(server);
require('./src/routes/admin/subSubCategory.routes.js')(server);
require('./src/routes/admin/product.routes.js')(server);


// Website URls
require('./src/routes/website/user.routes.js')(server);


server.listen(8000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/offline_mongoose')
    .then(() => console.log('Connected!'))
    .catch((error) => {
        console.log('Database Error - ', error)
    });
})