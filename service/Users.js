const { User } = require('../models');
const valid = require('../Schemas/userValidator');
const validLogin = require('../Schemas/loginValidator');

const createUser = async (displayName, email, password, image) => {
    const { message, code } = await valid.validator(displayName, email, password);
    if (message) return { message, code };
    await User.create({ displayName, email, password, image });
    const { token } = await valid.generateToken(email, displayName);
    return { token };
};

const userLogin = async (email, password) => {
 const { message, code } = await validLogin.validateLogin(email, password);
 if (message) return { message, code };
    const data = await User.findOne({
        where: { email, password },
    })
    .then((res) => res)
    .catch((err) => err);
    
if (data) {
    const { token } = await validLogin.generateLoginToken(email);
    return { token };
}
};

const getUser = async () => {
    const data = await User.findAll();
    return data;
};

module.exports = {
    createUser,
    getUser,
    userLogin,
};