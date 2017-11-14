const Sequelize = require('sequelize');
const config = require('../config.json');

const sequelize = new Sequelize({
  database: 'spotifind',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
  }
});

sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    allowNull: false
  },
  spotify_id: {
    type: Sequelize.STRING,
    unique: true
  },
  access_token: { type: Sequelize.STRING },
  refresh_token: {type: Sequelize.STRING },
});

sequelize.define('playlist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING },
  spotify_playlist_id: { type: Sequelize.STRING },
  size: {
    type: Sequelize.ENUM,
    values: ['s' ,'m', 'l'],
  },
  type: {
    type: Sequelize.ENUM,
    values: ['party', 'road_trip', 'chill', 'romantic', 'focus', 'none'],
  },
});

sequelize.sync().then(() => {
  console.log("db sync success");
}).catch(error => {
  console.error("db sync error");
  console.error(error);
})


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

