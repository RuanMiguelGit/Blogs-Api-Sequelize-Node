const { Categorie } = require('../models');

const validateTitle = (title) => {
    if (!title) {
 return {
        code: 400,
        message: '"title" is required',
    }; 
}
    return {};
};

const validateContent = (content) => {
    if (!content) {
 return {
        code: 400,
        message: '"content" is required',
    }; 
}
    return {};
};

const validateCategoryIds = (categoryIds) => {
    if (typeof categoryIds === 'string' || !categoryIds) {
 return {
        code: 400,
        message: '"categoryIds" is required',
    }; 
}
    return {};
};

const validateExistingCategory = async (categoryIds) => {
    const finder = await Categorie.findOne({
        where: { id: categoryIds },
    });

    console.log('oia o finder', finder);
    if (finder) return {};
    return {
        code: 400,
       message: '"categoryIds" not found',
    }; 
};

const validatePost = async (title, content, categoryIds) => {
    const titleValidation = await validateTitle(title);
    if (titleValidation.message) return titleValidation;
    const contentValidation = await validateContent(content);
    if (contentValidation.message) return contentValidation;
    const categoryIdsValidation = await validateCategoryIds(categoryIds);
    if (categoryIdsValidation.message) return categoryIdsValidation;
    const existingCategorysValidation = await validateExistingCategory(categoryIds);
    if (existingCategorysValidation.message) return existingCategorysValidation;
    return {};
};

module.exports = {
    validatePost,
};