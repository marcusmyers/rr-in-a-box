$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

  // Sets the total tickets left
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

    // Get name on the ticket number
		var ticketName = names[intRand];

		$('#pickedNumber').html(intRand+"<br><p>"+ticketName+"</p>");

		db.transaction( function(tx) {
		    tx.executeSql("INSERT INTO pickedTickets (ticket_id) VALUES (?)",
		        [ intRand ],
		        sqlWin,
		        sqlFail
		    );
		});
		var sponsorInfo = "";
		if(testI == 0  || i == 1 || i == 217){
			sponsorInfo = sponsors[i];
			$('#pickedNumber').removeClass('btn-primary');
			$('#pickedNumber').addClass('btn-danger');
			$('.pickedNumbers').append('<li class="'+i+' alert alert-error">' + intRand +' - ' + ticketName + '</li>');
			alert("PRIZE WINNER!!! Ticket No: "+intRand+' - ' + ticketName);
		} else {
			if(i== 296 || i == 297 || i == 298 || i==299){
				sponsorInfo = sponsors[i];
			} else {
				sponsorInfo = "";
				$('#pickedNumber').removeClass('btn-danger')
				$('#pickedNumber').addClass('btn-primary');
				$('.pickedNumbers').append('<li class="'+i+'">' + intRand +' - ' + ticketName + '</li>');
			}
		}
		if(sponsorInfo != ""){
			socket.emit('message', intRand+","+ticketName+","+sponsorInfo);
		} else {
			socket.emit('message', intRand+","+ticketName );
	  }
		var tickets = totalTickets - i;
		$('.totalTickets').html("Tickets Left: "+ tickets);
		i++;
	});
});
