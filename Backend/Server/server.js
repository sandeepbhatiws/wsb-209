const server = require('http');
const { categories, brands } = require('./data.js');

server.createServer((request, response) => {

    console.log(request.method);

    if(request.url == '/'){
        response.end('Server is working fine');
    } else if(request.url == '/categories' && request.method == 'POST') {
        if(categories.length > 0){
            const result = {
                _status: true,
                _message: 'Data Fetch.',
                _data: categories
            }

            response.end(JSON.stringify(result));
        } else {
            const result = {
                _status: false,
                _message: 'No Record Found.',
                _data: []
            }

            response.end(JSON.stringify(result));
        }
    } else if(request.url == '/brands') {
        if(brands.length > 0){
            const result = {
                _status: true,
                _message: 'Data Fetch.',
                _data: brands
            }

            response.end(JSON.stringify(result));
        } else {
            const result = {
                _status: false,
                _message: 'No Record Found.',
                _data: []
            }

            response.end(JSON.stringify(result));
        }
    } else{
        response.end('API not Found');
    }

    

}).listen(5000)



// const http = require('http');

// var server = http.createServer(() => {

// });

// server.listen(5000)