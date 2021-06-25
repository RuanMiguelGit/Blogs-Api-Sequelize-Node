const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'seusecretdetoken';

const passWordLoginCheck = async (password) => {
    if (password === undefined) {
 return {
        message: '"password" is required',
        code: 400,
    }; 
}
    if (!password.trim() || /^\s*$/.test(password) || password.length === 0) {
 return {
        message: '"password" is not allowed to be empty',
        code: 400,
    }; 
}

    return {};
};

const emailLoginCheck = async (email) => {
    if (email === undefined) {
 return {
        message: '"email" is required',
        code: 400,
    }; 
}
    if (!email.trim() || /^\s*$/.test(email) || email.length === 0) {
 return {
        message: '"email" is not allowed to be empty',
        code: 400,
    }; 
}

    return {};
};

const loginUservalidator = async (email, password) => {
    const data = await User.findOne({
        where: { email, password },
    })
    
    .then((res) => res)
    .catch((err) => err);
   
    if (!data || data === null) {
 return {
        message: 'Invalid fields',
        code: 400,
    }; 
}
    return {};
};

const generateLoginToken = async (email) => {
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
    
      const token = await jwt.sign({ data: email }, secret, jwtConfig);
      return { token };
};

const validateLogin = async (email, password) => {
const emailLoginValidation = await emailLoginCheck(email);
if (emailLoginValidation.message) return emailLoginValidation;
const passwordLoginValidation = await passWordLoginCheck(password);
if (passwordLoginValidation.message) return passwordLoginValidation;
const userLoginValidation = await loginUservalidator(email, password);
 if (userLoginValidation.message) return userLoginValidation;
return {};
};

module.exports = {
    validateLogin,
    generateLoginToken,

};