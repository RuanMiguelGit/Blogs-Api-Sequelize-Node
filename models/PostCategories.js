// models/UserBook.js
module.exports = (sequelize, _DataTypes) => {
    const PostsCategories = sequelize.define('PostsCategories',
      {},
      { timestamps: false });
  
    PostsCategories.associate = (models) => {
      models.Categorie.belongsToMany(models.BlogPosts, {
        as: 'posts',
        through: PostsCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
      models.BlogPosts.belongsToMany(models.Categorie, {
        as: 'categories',
        through: PostsCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    };
  
    return PostsCategories;
  };