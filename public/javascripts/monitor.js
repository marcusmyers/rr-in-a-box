$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');
	var iCounter = 1;
  if(localStorage.getItem('totalTickets') === undefined){
    localStorage.setItem('totalTickets', 300);
  }
	socket.on('monitor', function(data){

		var testI = iCounter % 20;

		var n = data.split(',');

		var intRand = n[0];
		var ticketName = n[1];

		if(testI == 0 || iCounter == 1){
			if(iCounter == 300){
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-success');
			} else {
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-danger');
			}
			$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p><p class='small'>Prize Winner</p>");
		//	$('#sponsor').show().html(n[2]);
		} else {
			if(iCounter == 296 || iCounter == 297 || iCounter==298 || iCounter==299){
				$('#pickedNumber').removeClass('btn-primary');
				$('#pickedNumber').addClass('btn-success');
			//	$('#sponsor').show().html(n[2]);
			} else {
				$('#pickedNumber').removeClass('btn-danger')
				$('#pickedNumber').addClass('btn-primary');
			//	$('#sponsor').hide();
			}
			$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p>");
		}
    c = localStorage.getItem('totalTickets');
		$('.totalTickets').html("Tickets Left: "+ c);
		iCounter++;
	});

});
