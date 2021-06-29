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

const getPost = async (req, res) => {
const data = await PostsService.getPost();
return res.status(200).json(data);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const data = await PostsService.getPostById(id);
    if (data === null) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(data);
};

module.exports = {
    createPost,
    getPost,
    getPostById,
};