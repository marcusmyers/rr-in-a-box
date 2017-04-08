localStorage.setItem('totalTickets', rafflesize);
for(i=1;i<=rafflesize;i++){
  localStorage.setItem(i, i); //saves to the database, "key", "value"
}

for(i=0; i < boostertickets.length; i++) {
  localStorage.removeItem(boostertickets[i]);
}

function addTicket(data){
	localStorage.setItem(data, data);
	$('.'+data).hide();
}
