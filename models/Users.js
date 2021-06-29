// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    
    {
      timestamps: false,
      tableName: 'Users',
      undersore: true,
    });

    User.associate = (models) => {
      User.hasOne(models.BlogPosts,
          { foreignKey: 'userId', as: 'users' });
  };
  
    return User;
  };