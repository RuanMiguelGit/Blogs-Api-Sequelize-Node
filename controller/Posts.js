const PostsService = require('../service/Posts');
const postSchema = require('../Schemas/postsValidator');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const user = req.user.data;
    const { message, code } = await postSchema.validatePost(title, content, categoryIds);
    if (message) return res.status(code).json({ message });
    const { userId, id } = await PostsService.createPost(title, content, user);
     await PostsService.createPostCategories(id, categoryIds);
    return res.status(201).json({
        id,
        userId,
        title,
        content,
    });
};

module.exports = {
    createPost,
};