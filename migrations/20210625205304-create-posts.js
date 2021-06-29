"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Posts = queryInterface.createTable("BlogPosts", {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
     
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        allowNull:false,
        type:Sequelize.DATE
      }, 
     userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });

    return Posts;
  },

  down: async (queryInterface) => queryInterface.dropTable("BlogPosts"),
};
