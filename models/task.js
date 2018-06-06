'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    taskType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'weekly'
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.House, {
      foreignKey: 'houseId',
      onDelete: 'CASCADE',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Task;
};