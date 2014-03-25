var aboosterTicketsHold = new Array(13,298,299,300);
var totalTickets = 300;
for(i=1;i<=300;i++){
	localStorage.setItem(i, i); //saves to the database, "key", "value"
}

localStorage.removeItem(13);
localStorage.removeItem(299);
localStorage.removeItem(300);
var pickedTickets = new Array();
var i = 1;
var DB_NAME    = "rr_picked_Numbers";
var DB_VERSION = "1.0";
var DB_TITLE   = "Athletic Boosters Reverse Raffle Database";
var DB_BYTES   = 5000000;
var db = window.openDatabase(DB_NAME, DB_VERSION, DB_TITLE, DB_BYTES);

function sqlFail(err) { alert("SQL failed: " + err.message); }
function txFail(err) { alert("TX failed: " + err.message); }

function sqlWin(tx, response) { console.log("SQL succeeded: " + response.rows.length + " rows."); }
function txWin(tx) { console.log("TX succeeded."); }

function addTicket(data){
	localStorage.setItem(data, data);
	$('.'+data).hide();
}

db.transaction( function(tx) {
    var queryParams = [];
    tx.executeSql('DROP TABLE IF EXISTS pickedTickets');
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pickedTickets (ID INTEGER PRIMARY KEY ASC, ticket_id TEXT)",
        queryParams,
        sqlWin,
        sqlFail
    );
}, txFail, txWin);


