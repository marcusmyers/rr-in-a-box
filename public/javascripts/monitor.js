$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');
	var iCounter = 1;
	var totalTickets = 300;

	socket.on('monitor', function(data){
		
		var testI = iCounter % 20;

		var n = data.split(',');

		var intRand = n[0];
		var ticketName = n[1];

		if(testI == 0 || iCounter == 1 || iCounter == 217){
			if(iCounter == 300){
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-success');
			} else {
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-danger');
			}
			$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p><p class='small'>Prize Winner</p>");
		} else {
			if(iCounter == 296 || iCounter == 297 || iCounter==298 || iCounter==299){
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-success');
			} else {
				$('#pickedNumber').removeClass('btn-danger')
				$('#pickedNumber').addClass('btn-primary');
			}
			$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p>");
		}

		totalTickets--;
		$('.totalTickets').html("Tickets Left: "+ totalTickets);
		iCounter++;
	});

});