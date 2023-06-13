'use strict';


const todoModel = (sequelize, DataType) => sequelize.define('Todo2' , {
    assignee: {type: DataType.STRING, required: true},
    complete: {type: DataType.BOOLEAN, required: true},
    difficulty: {type: DataType.STRING, required: true}
})

module.exports = todoModel;