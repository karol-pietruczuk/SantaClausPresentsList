const { Router } = require('express');

const homeRouter = Router();
homeRouter
  .get('/', (req, res) => {
    res
    // .status(204)
      .redirect('/child');
  });

module.exports = {
  homeRouter,
};
