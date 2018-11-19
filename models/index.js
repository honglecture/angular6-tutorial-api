const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require('./member')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);

db.Member.hasMany(db.Board, {foreignKey: 'writer', sourceKey: 'id'});
db.Board.belongsTo(db.Member, {foreignKey: 'writer', targetKey: 'id'});

db.Board.hasMany(db.Comment, {foreignKey: 'boardId', sourceKey: 'id'});
db.Comment.belongsTo(db.Board, {foreignKey: 'boardId', targetKey: 'id'});

db.Member.hasMany(db.Comment, {foreignKey: 'writer', sourceKey: 'id'});
db.Comment.belongsTo(db.Member, {foreignKey: 'writer', targetKey: 'id'});

module.exports = db;