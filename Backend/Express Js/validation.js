
const validation = (request, response, next) => {

    if(!request.query.username || !request.query.password){
        const result = {
            _status: false,
            _message: 'Required field missing !',
            _data: []
        }

        response.send(result);
    } else if(request.query.username != 'admin' || request.query.password != 123456){
        const result = {
            _status: false,
            _message: 'Invalid credentails !',
            _data: []
        }

        response.send(result);
    }
    
    next()
}

module.exports = { validation }