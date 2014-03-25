$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	var iCounter = 1;
	$('li').addClass('loaded');

	socket.on('pickedcard', function(data){
		var item = "."+data;
		var testI = iCounter % 20;

		if(testI == 0 || iCounter == 1 || iCounter == 217){
			if(iCounter == 300){
				$(item).removeClass('loaded').addClass('finalWinners');
			} else {
				$(item).removeClass('loaded').addClass('winner20');
			}
		} else {
			if(iCounter == 296 || iCounter == 297 || iCounter == 298 || iCounter == 299){
				$(item).removeClass('loaded').addClass('finalWinners');
			} else {
				$(item).removeClass('loaded').addClass('remove');
			}
		}
		iCounter++;
	});
});
