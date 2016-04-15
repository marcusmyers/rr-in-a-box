$(document).ready(function(){
	var socket = io.connect('http://192.168.99.100:3000');
  var i=1
  totalTickets = localStorage.getItem('totalTickets');
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
		var intRand = localStorage[Math.round(300 * Math.random())];
		if(intRand == null){
			intRand = checkPicked(intRand);
			localStorage.removeItem(intRand);
		} else {
			localStorage.removeItem(intRand);
		}
    socket.emit('message', intRand);
    var ticketNo = intRand;
    intRand = "";

    var testI = i % 20;
    var ticketName = "test";
    function setTicketName() {
      $('#pickedNumber').html(ticketNo+"<br><p>"+ticketName+"</p>");
    }
    socket.on('work', function(data){
      ticketName = data;
      setTicketName();
    });
      var sponsorInfo = "";
		  if(testI == 0  || i == 1){
			  $('#pickedNumber').removeClass('btn-primary');
			  $('#pickedNumber').addClass('btn-danger');

        alert("PRIZE WINNER!!!");
		  } else {
			  if(i== 296 || i == 297 || i == 298 || i==299){
				  alert("PRIZE WINNER!!!");
			  } else {
				  sponsorInfo = "";
				  $('#pickedNumber').removeClass('btn-danger')
				  $('#pickedNumber').addClass('btn-primary');
			  }
		  }
      ticketName = "";
      i++;
      totalTickets = localStorage.getItem('totalTickets');
		  var tickets = totalTickets-1;
      localStorage.setItem('totalTickets', tickets);
		  $('.totalTickets').html("Tickets Left: "+ tickets);
	});
});
