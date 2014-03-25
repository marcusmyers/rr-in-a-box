
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Athletic Boosters Reverse Raffle' });
};