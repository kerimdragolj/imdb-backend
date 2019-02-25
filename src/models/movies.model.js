// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const movies = sequelizeClient.define('movies', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backdrop_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vote_average: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    release_date: {
      type: DataTypes.STRING,
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
  movies.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    movies.belongsToMany(models.actors, {
      through: 'movie_actors',
      as: 'actors'
    });
    movies.hasMany(models.ratings, {
      foreignKey: {
        name: "movieId",
        allowNull: true
      },
      as: 'ratings'
    });
    movies.belongsToMany(models.genres, {
      through: 'movie_genres',
      as: 'genres'
    });
    models.genres.belongsToMany(movies, {
      through: 'movie_genres',
      as: 'movies'
    });
  };

  return movies;
};
