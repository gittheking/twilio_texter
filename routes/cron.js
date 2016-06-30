const router  = require('express').Router();
const cronJob = require('cron').CronJob;

// '00 24 21 * * 0-6'
const textJob1 = new cronJob('* * * * * *', ()=>{console.log('going1')}, ()=>{console.log('stopped1')}, false);
const textJob2 = new cronJob('* * * * * *', ()=>{console.log('going2')}, ()=>{console.log('stopped2')}, false);

router.get('/start/:id', (req,res) => {
  if(req.params.id === "1") textJob1.start();
  if(req.params.id === "2") textJob2.start();
  res.redirect('/');
});

router.get('/stop/:id', (req,res) => {
  if(req.params.id === "1") textJob1.stop();
  if(req.params.id === "2") textJob2.stop();
  res.redirect('/');
});

module.exports = router;