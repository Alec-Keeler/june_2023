'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Game, { foreignKey: 'faveGameId'})
      // SELECT * FROM Users
      // JOIN Games ON (Users.faveGameId = Games.id)
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'UserReviews'
      })
      // JOIN Reviews ON (Reviews.userId = Users.id)

      User.belongsToMany(models.Review, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'reviewId'
      })
      // SELECT * FROM Users
      // JOIN Likes ON (Users.id = Likes.userId)
      // JOIN Reviews ON (Likes.reviewId = Reviews.id)
    }
  }
  User.init({
    // SSN: {
    //   primaryKey: true
    // },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    faveGameId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};