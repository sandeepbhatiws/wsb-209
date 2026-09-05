var jwt = require('jsonwebtoken');
var userModel = require('../../models/User');

var validateToken = async(request, response, next) => {

    try {
        var authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.send({
                _status : false,
                _message : 'Authorization token is required !',
                _error : '',
                _data : ''
            })
        }

        var token = authHeader.split(' ')[1];
        var decode = jwt.verify(token, process.env.server_key);

        var user = await userModel.findOne({
            _id : decode._id,
            deleted_at : null
        });

        if (!user) {
            return response.send({
                _status : false,
                _message : 'Invalid token !',
                _error : '',
                _data : ''
            })
        }

        if (!user.status) {
            return response.send({
                _status : false,
                _message : 'Your account has been deactivated !',
                _error : '',
                _data : ''
            })
        }

        request.user = user;
        next();
    } catch (error) {
        response.send({
            _status : false,
            _message : 'Invalid or expired token !',
            _error : '',
            _data : ''
        })
    }
}

module.exports = validateToken
