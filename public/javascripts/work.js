$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	$('.totalTickets').html("Tickets Left: "+totalTickets);
	function checkPicked(ticketNum){
		if(localStorage.getItem(ticketNum) === null){
			return checkPicked(Math.round(300 * Math.random()));
		} else {
			return ticketNum;
		}
	}

	$('#pullNumber').click(function(){
		var testI = i % 20;

		var intRand = localStorage[Math.round(300 * Math.random())];
		if(intRand == null){
			intRand = checkPicked(intRand);
			localStorage.removeItem(intRand);
		} else {
			localStorage.removeItem(intRand); 
		}

		var ticketName = names[intRand];

		$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p>");

		db.transaction( function(tx) {
		    tx.executeSql("INSERT INTO pickedTickets (ticket_id) VALUES (?)",
		        [ intRand ],
		        sqlWin,
		        sqlFail
		    );
		});
		if(testI == 0  || i == 1 || i == 217){
			$('#pickedNumber').removeClass('btn-primary');
			$('#pickedNumber').addClass('btn-danger');
			$('.pickedNumbers').append('<li class="'+i+' alert alert-error">' + intRand +' - ' + ticketName + '</li>');
			alert("PRIZE WINNER!!! Ticket No: "+intRand+' - ' + ticketName);
		} else {
			$('#pickedNumber').removeClass('btn-danger')
			$('#pickedNumber').addClass('btn-primary');
			$('.pickedNumbers').append('<li class="'+i+'">' + intRand +' - ' + ticketName + '</li>');
			
		}
		socket.emit('message', intRand+","+ticketName );
		var tickets = totalTickets - i;
		$('.totalTickets').html("Tickets Left: "+ tickets);
		i++;
	});
});