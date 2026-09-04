var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require('../../models/User');

const nameRegex = /^[a-z A-Z]{2,15}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const mobileRegex = /^[0-9]{8,15}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_.-]{6,20}$/;

const validateRegister = (body) => {
    const errors = {};

    if (!body.name || !body.name.trim()) {
        errors.name = 'Name is required';
    } else if (!nameRegex.test(body.name.trim())) {
        errors.name = 'Name must contain only letters and spaces (2-15 characters)';
    }

    if (!body.email || !body.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(body.email.trim())) {
        errors.email = 'Please enter a valid email address';
    }

    if (!body.password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(body.password)) {
        errors.password = 'Password must be 6-20 characters long and contain at least one letter and one number';
    }

    if (!body.confirm_password) {
        errors.confirm_password = 'Confirm password is required';
    } else if (body.password && body.password !== body.confirm_password) {
        errors.confirm_password = 'Password and confirm password do not match';
    }

    if (body.mobile_number && !mobileRegex.test(String(body.mobile_number).trim())) {
        errors.mobile_number = 'Mobile number must be 8-15 digits';
    }

    if (body.gender && !['Male', 'Female'].includes(body.gender)) {
        errors.gender = 'Gender must be either Male or Female';
    }

    return errors;
}

const validateLogin = (body) => {
    const errors = {};

    if (!body.email || !body.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(body.email.trim())) {
        errors.email = 'Please enter a valid email address';
    }

    if (!body.password) {
        errors.password = 'Password is required';
    }

    return errors;
}

exports.register = async(request, response) => {

    try {
        const body = request.body || {};
        const errors = validateRegister(body);

        if (Object.keys(errors).length > 0) {
            return response.send({
                _status : false,
                _message : 'Validation Error !',
                _error : errors,
                _data : ''
            })
        }

        const existing = await userModel.findOne({
            email : body.email.trim(),
            deleted_at : null
        });

        if (existing) {
            return response.send({
                _status : false,
                _message : 'Validation Error !',
                _error : { email : 'The specified email is already in use.' },
                _data : ''
            })
        }

        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const dataSave = {
            name : body.name.trim(),
            email : body.email.trim(),
            password : hashedPassword,
            mobile_number : body.mobile_number || '',
            address : body.address || '',
            gender : body.gender || '',
        };

        userModel(dataSave).save()
        .then((result) => {
            const userData = result.toObject();
            delete userData.password;

            const token = jwt.sign({ _id : userData._id, email : userData.email }, process.env.server_key, { expiresIn : '7d' });

            const data = {
                _status : true,
                _message : 'Registered Successfully !',
                _error : '',
                _data : { user : userData, token : token }
            }

            response.send(data)
        })
        .catch((error) => {
            var fieldErrors = {};
            for (var i in error.errors) {
                fieldErrors[i] = error.errors[i].message;
            }

            const data = {
                _status : false,
                _message : 'Something went wrong !',
                _error : Object.keys(fieldErrors).length > 0 ? fieldErrors : error,
                _data : ''
            }

            response.send(data)
        })
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : ''
        }

        response.send(data)
    }
}

exports.login = async(request, response) => {

    try {
        const body = request.body || {};
        const errors = validateLogin(body);

        if (Object.keys(errors).length > 0) {
            return response.send({
                _status : false,
                _message : 'Validation Error !',
                _error : errors,
                _data : ''
            })
        }

        const user = await userModel.findOne({
            email : body.email.trim(),
            deleted_at : null
        });

        if (!user) {
            return response.send({
                _status : false,
                _message : 'Invalid email or password !',
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

        const checkPassword = await bcrypt.compare(body.password, user.password);

        if (!checkPassword) {
            return response.send({
                _status : false,
                _message : 'Invalid email or password !',
                _error : '',
                _data : ''
            })
        }

        const token = jwt.sign({ _id : user._id, email : user.email }, process.env.server_key, { expiresIn : '7d' });

        const userData = user.toObject();
        delete userData.password;

        const data = {
            _status : true,
            _message : 'Login Successful !',
            _error : '',
            _data : { user : userData, token : token }
        }

        response.send(data)
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : ''
        }

        response.send(data)
    }
}
