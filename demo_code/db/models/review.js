'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.belongsTo(models.Game, {
        foreignKey: 'gameId'
      })
      Review.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'reviewId',
        otherKey: 'userId',
        as: 'UserLikes'
      })
      // SELECT * FROM Reviews
      // JOIN Likes ON (Likes.reviewId = Reviews.id)
      // JOIN Users ON (Likes.usersId = Users.id)
    }
  }
  Review.init({
    rating: DataTypes.INTEGER,
    complexity: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    gameId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};