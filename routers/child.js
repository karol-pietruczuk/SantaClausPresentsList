const { Router } = require('express');
const { ValidationError } = require('../utils/errors');
const { GiftRecord } = require('../records/gift.record');
const { ChildRecord } = require('../records/child.record');

const childRouter = Router();
childRouter
  .get('/', async (req, res) => {
    const childrenList = await ChildRecord.listAll();
    const giftsList = await GiftRecord.listAll();
    res.render('child/list', {
      childrenList,
      giftsList,
    });
  })
  .post('/', async (req, res) => {
    const newChild = new ChildRecord(req.body);
    await newChild.insert();

    res.redirect('/child');
  })
  .patch('/gift/:childId', async (req, res) => {
    const child = await ChildRecord.getOne(req.params.childId);
    // await newChild.insert();
    if (child === null) {
      throw new ValidationError('Nie znaleziono dziecka z podanym ID.');
    }
    const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

    if (gift) {
      if (gift.count <= await gift.countGivenGifts()) {
        throw new ValidationError('Tego prezentu jest za mało!');
      }
    }

    // child.giftId = gift === null ? null : gift.id;
    child.giftId = gift?.id ?? null; // TO JEST TO SAMO CO WYŻEJ - DZIALA W NAJNOWSZEJ WERSJI JS
    await child.update();
    res.redirect('/child');
  });

module.exports = {
  childRouter,
};
