
/*
 * GET board page.
 */

exports.board = function(req, res){
  res.render('board', { title: 'Reverse Raffle Board' });
};