$(document).ready(function(){
	var socket = io.connect('http://'+host+':3000');

	var iCounter = 1;
	$('li').addClass('loaded');

	socket.on('pickedcard', function(data){
		var item = "."+data;
		var testI = iCounter % 20;

		if(testI == 0 || iCounter == 1){
			if(iCounter == rafflesize){
				$(item).removeClass('loaded').addClass('finalWinners');
			} else {
				$(item).removeClass('loaded').addClass('winner20');
			}
		} else {
			if(iCounter == (rafflesize-4) || iCounter == (rafflesize-3) || iCounter == (rafflesize-2) || iCounter == (rafflesize-1)){
				$(item).removeClass('loaded').addClass('finalWinners');
			} else {
				$(item).removeClass('loaded').addClass('remove');
			}
		}
		iCounter++;
	});
});
