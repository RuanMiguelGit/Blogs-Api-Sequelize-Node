const CategoriesService = require('../service/Categories');

const createCategory = async (req, res) => {
    const { name } = req.body;
    const { message, data, code } = await CategoriesService.createCategory(name);
 if (message) return res.status(code).json({ message });
  return res.status(201).json(data);
};

module.exports = {
    createCategory,
};