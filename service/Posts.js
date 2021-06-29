const { BlogPosts, PostsCategories, Categorie, User } = require('../models');
const UpdateSchema = require('../Schemas/updatePostValidator');

const createPost = async (title, content, user) => {
    const data = await
     BlogPosts.create({ title, content, published: Date.now(), updated: Date.now(), userId: user });
    return data;
    };
    
const createPostCategories = async (id, categoryIds) => {
 const data = await categoryIds.forEach((item) => {
         PostsCategories.create({ postId: id, categoryId: item });
  });
return data;
};

const getPost = async () => {
    const data = await BlogPosts.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } }],

    });
    return data;
};

const getPostById = async (id) => {
    const data = await BlogPosts.findOne({
        where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } }],

    });
   
    return data;
};

const updatePost = async (id, { title, content, categoryIds }) => {
    const { message, code } = await UpdateSchema.validateEdit({ categoryIds, title, content });
    if (message) return { message, code };
    const data = await BlogPosts.update(
        { title, content },
        { where: { id } },
)
.then(() => BlogPosts.findOne({
        where: { id },
        include: [ 
        { model: Categorie, as: 'categories', through: { attributes: [] } }],
    }));
return { data };
};

module.exports = {
    createPost,
    createPostCategories,
    getPost,
    getPostById,
    updatePost,
};