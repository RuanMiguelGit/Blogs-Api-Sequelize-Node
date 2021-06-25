const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'seusecretdetoken';

const emailCheck = async (email) => {
    const emailIsValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) {
        return {
            message: '"email" is required',
            code: 400,
        };
}

if (!emailIsValid.test(email)) {
    return {
        message: '"email" must be a valid email',
        code: 400,
    };
}
return {};
};

const displayNameCheck = async (displayName) => {
    if (displayName.length < 8) {
        return {
            message: '"displayName" length must be at least 8 characters long',
            code: 400,
        };
    }
    return {};    
};

const passwordCheck = async (password) => {
    if (!password) {
        return {
            message: '"password" is required',
            code: 400,
        };
    }
if (password.length < 6) {
        return {
            message: '"password" length must be 6 characters long',
            code: 400,
        };
    }
    return {};
};

const registerUser = async (email) => {
    const data = await User.findOne({
        where: { email },
    })
    .then((res) => res)
    .catch((err) => err);
    console.log(data);
     if (data !== null) {
 return {
         message: 'User already registered',
         code: 409,
     }; 
}
     return {};
};

const generateToken = async (email, displayName) => {
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
    
    if (email && displayName) { 
    const token = await jwt.sign({ data: email, displayName }, secret, jwtConfig);
    return { token };
    }
    return {};
};

const validator = async (displayName, email, password) => {
const emailValidation = await emailCheck(email);
if (emailValidation.message) return emailValidation; 
const displayValidation = await displayNameCheck(displayName);
if (displayValidation.message) return displayValidation;
const passwordValidation = await passwordCheck(password);
if (passwordValidation.message) return passwordValidation;
const registerUserValidation = await registerUser(email);
if (registerUserValidation) return registerUserValidation;
};

module.exports = {
validator,
generateToken,
};