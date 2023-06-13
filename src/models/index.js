'use strict';

const userModel = require('./users/users');
const { Sequelize, DataTypes } = require('sequelize');
// const clothesModel = require('./clothes/model');
const todoModel = require('./todo/todo');
const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL,{});
const todo = todoModel(sequelize, DataTypes);
// const clothes = clothesModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  todo: new Collection(todo)
  // clothes: new Collection(clothes),
}
