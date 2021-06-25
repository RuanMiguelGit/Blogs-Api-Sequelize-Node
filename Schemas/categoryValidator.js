const validateName = (name) => {
    if (!name || name === null || name === undefined) {
 return {
        message: '"name" is required',
        code: 400,
    }; 
}
    return {};
};

const validateCategory = async (name) => {
    const { message, code } = await validateName(name);
    if (message) return { message, code };
    return {};
};

module.exports = {
    validateCategory,
};