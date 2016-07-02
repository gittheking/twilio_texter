const router = require('express').Router();
const { getTrainStatus } = require('../services/mta_status');
router.get('/', (req,res) => {
  res.render('index');
});

router.get('/trains',(req,res) => {
  let trains = ['6','L','F','A','J'];
  getTrainStatus(trains).then((response, err) => {
    if(err) throw err;
    res.json(response);
  })
});

module.exports = router;