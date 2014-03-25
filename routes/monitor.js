
/*
 * GET monitor page.
 */

exports.monitor = function(req, res){
  res.render('monitor', { title: 'Reverse Raffle monitor' });
};