var aboosterTicketsHold = new Array(13,109,255);
localStorage.setItem('totalTickets', 300);
for(i=1;i<=300;i++){
	localStorage.setItem(i, i); //saves to the database, "key", "value"
}

localStorage.removeItem(13);
localStorage.removeItem(109);
localStorage.removeItem(255);

function addTicket(data){
	localStorage.setItem(data, data);
	$('.'+data).hide();
}
