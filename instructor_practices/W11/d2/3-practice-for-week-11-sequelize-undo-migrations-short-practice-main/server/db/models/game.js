'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Game.init({
    name: DataTypes.STRING,
    minPlayers: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    category: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    avgPlayTime: DataTypes.INTEGER,
    minAge: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};