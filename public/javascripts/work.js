$(document).ready(function(){
  var socket = io.connect('http://'+host+':3000');
  var i=1
  totalTickets = localStorage.getItem('totalTickets');
  // Sets the total tickets left
  $('.totalTickets').html("Tickets Left: "+totalTickets);

  function checkPicked(ticketNum){
    if(localStorage.getItem(ticketNum) === null){
      return checkPicked(Math.round(rafflesize * Math.random()));
    } else {
      return ticketNum;
    }
  }

  $('#pullNumber').click(function(){
    var intRand = localStorage[Math.round(rafflesize * Math.random())];
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
    } else {
      if(i== (rafflesize-4) || i == (rafflesize-3) || i == (rafflesize-2) || i==(rafflesize-1)){
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
