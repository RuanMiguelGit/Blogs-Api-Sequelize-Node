const { BlogPosts, PostsCategories } = require('../models');

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

module.exports = {
    createPost,
    createPostCategories,
};