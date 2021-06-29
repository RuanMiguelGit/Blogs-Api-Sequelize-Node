// models/Address.js
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('BlogPosts', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
    });
  
    Posts.associate = (models) => {
      Posts.belongsTo(models.User,
        { foreignKey: 'userId', as: 'users' });
    };
  
    return Posts;
  };