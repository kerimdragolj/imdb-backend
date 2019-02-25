// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const shows = sequelizeClient.define('shows', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vote_average: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backdrop_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    first_air_date: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  shows.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    shows.belongsToMany(models.actors, {
      through: 'show_actors',
      as: 'actors'
    });
    shows.belongsToMany(models.genres, {
      through: 'show_genres',
      as: 'genres'
    });
    models.genres.belongsToMany(shows, {
      through: 'show_genres',
      as: 'shows'
    });
    shows.hasMany(models.ratings, {
      foreignKey: {
        name: "showId",
        allowNull: true
      },
      as: 'ratings'
    });
  };

  return shows;
};