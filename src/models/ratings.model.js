// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const ratings = sequelizeClient.define('ratings', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  ratings.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    ratings.belongsTo(models.users, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      as: 'user',
      constraints: false
    });
    ratings.belongsTo(models.movies, {
      foreignKey: {
        name: "movieId",
        allowNull: true
      },
      as: 'movie'
    });
    ratings.belongsTo(models.shows, {
      foreignKey: {
        name: "showId",
        allowNull: true
      },
      as: 'show'
    });
  };

  return ratings;
};