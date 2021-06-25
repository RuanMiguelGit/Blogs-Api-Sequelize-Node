// models/User.js
module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
      undersore: true,
    });
  
    return Categorie;
  };