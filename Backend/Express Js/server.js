const express = require('express');
const { categories, brands } = require('../Server/data');
const { validation } = require('./validation');

//To Make Executable
const server = express();

route = express.Router();
route.use(validation);

server.get('/', (request, response) => {
    response.end('Server is working fine !')
});

// server.get('/categories', validation, (request, response) => {

//     if(categories.length > 0){
//         const result = {
//             _status: true,
//             _message: 'Data Fetch.',
//             _data: categories
//         }

//         response.send(result);
//     } else {
//         const result = {
//             _status: false,
//             _message: 'No Record Found.',
//             _data: []
//         }

//         response.send(result);
//     }
// });

// server.get('/brands', validation, (request, response) => {

//     if(brands.length > 0){
//         const result = {
//             _status: true,
//             _message: 'Data Fetch.',
//             _data: brands
//         }

//         response.send(result);
//     } else {
//         const result = {
//             _status: false,
//             _message: 'No Record Found.',
//             _data: []
//         }

//         response.send(result);
//     }
// });


route.get('/categories', (request, response) => {

    if(categories.length > 0){
        const result = {
            _status: true,
            _message: 'Data Fetch.',
            _data: categories
        }

        response.send(result);
    } else {
        const result = {
            _status: false,
            _message: 'No Record Found.',
            _data: []
        }

        response.send(result);
    }
});

route.get('/brands', (request, response) => {

    if(brands.length > 0){
        const result = {
            _status: true,
            _message: 'Data Fetch.',
            _data: brands
        }

        response.send(result);
    } else {
        const result = {
            _status: false,
            _message: 'No Record Found.',
            _data: []
        }

        response.send(result);
    }
});

server.get('/products', (request, response) => {

    if(brands.length > 0){
        const result = {
            _status: true,
            _message: 'Data Fetch.',
            _data: brands
        }

        response.send(result);
    } else {
        const result = {
            _status: false,
            _message: 'No Record Found.',
            _data: []
        }

        response.send(result);
    }
});

server.use('/api',route);

server.listen(5000, () => {
    console.log('Server is working Fine!')
})