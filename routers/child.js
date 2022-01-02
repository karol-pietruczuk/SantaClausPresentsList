const { Router } = require('express');
const { GiftRecord } = require('../records/gift.record');
const { ChildRecord } = require('../records/child.record');

const childRouter = Router();
childRouter
  .get('/', (req, res) => {
    const childrenList = ChildRecord.listAll();
    const giftsList = GiftRecord.listAll();
    res.render('child/list', {
      childrenList,
      giftsList,
    });
  });

module.exports = {
  childRouter,
};
