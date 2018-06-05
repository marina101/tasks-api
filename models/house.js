'use strict';
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define('House', {
    name: {
	    type: DataTypes.STRING,
	    allowNull: false,
    },
  });

  House.associate = (models) => {
    House.hasMany(models.User, {
    	foreignKey: 'houseId',
    	as: 'users',
    });
  };

  return House;
};