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
      Game.hasMany(models.User, {
        foreignKey: 'faveGameId', //GameId
        onDelete: 'CASCADE',
        // hooks: true
      })
      // SELECT * FROM Games
      // JOIN Users ON (Users.faveGameId = Games.id)

      Game.hasMany(models.Review, {
        foreignKey: 'gameId'
      })

      
      
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Board game name must be at least 2 characters long and no longer than 255 characters'
        }
      }
    },
    minPlayers: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      }
    },
    maxPlayers: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 30,
        isNotLessThanMin(value) {
          if (value < this.minPlayers) {
            throw new Error('maxPlayers must be equal to or greater than minPlayers')
          }
        }
      }
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cost: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    avgPlayTime: { 
      type: DataTypes.INTEGER
    },
    // minApprovedAge: {
    minAge: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    // available: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false
    // }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};