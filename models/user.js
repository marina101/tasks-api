'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    email: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.House, {
    	foreignKey: 'houseId',
    	onDelete: 'CASCADE',
    });

    User.hasMany(models.Task, {
    	foreignKey: 'userId',
    	as: 'tasks',
    });
  };

  return User;
};