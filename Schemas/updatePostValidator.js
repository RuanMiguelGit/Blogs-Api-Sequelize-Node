const checkCategoryIds = async (categoryIds) => {
    if (categoryIds !== undefined) {
 return {
        code: 400,
        message: 'Categories cannot be edited',
    }; 
}
    return {};
};

const checkTitle = async (title) => {
    if (title === null || !title) {
 return {
        code: 400,
        message: '"title" is required',
    }; 
}
    return {};
};

const checkContent = async (content) => {
    if (content === undefined) {
 return {
        code: 400,
        message: '"content" is required',
    }; 
}
    return {};
};

const validateEdit = async ({ title, content, categoryIds }) => {
    const { code, message } = await checkTitle(title);
    if (message) return { message, code };
    const validateCategoriesIDs = await checkCategoryIds(categoryIds);
    if (validateCategoriesIDs.message) return validateCategoriesIDs;
   
    const validateContent = await checkContent(content);
    if (validateContent.message) return validateContent;
    return {};
};

module.exports = {
    validateEdit,
};