const express = require('express')
const database = require('./database.js');
const mongodb = require('mongodb');

//To Make it Executable
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));


server.get('/', (request, response) => {
    response.send('Server sir working.')
})

server.post('/create-student', async(request, response) => {

    const db = await database();
    db.collection('students').insertOne({
        name : request.body.student_name,
        email : request.body.student_email,
        mobile_number : request.body.student_number
    }).then((result) => {
        const data = {
            _status : true,
            _message : 'Record created !!',
            _data : result
        }
        response.send(data);
    }).catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }
        response.send(data);
    })

})

server.post('/view-students', async (request, response) => {
    const db = await database();

    var filter = {};

    if(request.body != undefined && request.body.name != ''){
        filter.name = request.body.name;
    }

    db.collection('students').find(filter).toArray()
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch !!',
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !!',
                _data : result
            }
            response.send(data);
        }
    }).catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : []
        }
        response.send(data);
    })
})

server.post('/update-student', async(request, response) => {
    const db = await database();

    db.collection('students').updateOne({
        name : request.body.student_name,
        email : request.body.student_email,
        mobile_number : request.body.student_number
    }, {
        $set: {
            _id : new mongodb.ObjectId(request.body.id)
        }
    }).then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated !!',
            _data : result
        }
        response.send(data);
    }).catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }
        response.send(data);
    })
})

server.post('/delete-student', async(request, response) => {
    const db = await database();

    db.collection('students').deleteOne({
        _id : new mongodb.ObjectId(request.body.id)
    })
    .then((result) => {
        if(result.deletedCount > 0){
            const data = {
                _status : true,
                _message : 'Record deleted !!',
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !!',
                _data : null
            }
            response.send(data);
        }
    }).catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }
        response.send(data);
    })
})


server.listen(5000, () => {
    console.log('Server is working Fine.')
})