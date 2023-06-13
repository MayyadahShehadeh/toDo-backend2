'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middlewares/basic')
const bearerAuth = require('../middlewares/bearer')
const permissions = require('../middlewares/acl')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  // const list = userRecords.map(user => user.username);
  res.status(200).json(userRecords);
});

authRouter.delete('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let id = req.params.id;
  const userRecords = await users.findOne({where:{id}});
  const deleteUser = await userRecords.destroy();
  // const list = userRecords.map(user => user.username);
  res.status(200).json(deleteUser);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;
