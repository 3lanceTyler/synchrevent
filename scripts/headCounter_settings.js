// Requesting Data from N8N    
function dataCall () { 
    
    let con = "https://primary-production-9330.up.railway.app/webhook/head_counter/data_collect";
    fetch(con)
.then(res => {
    // Converting data to usable JSON
    return res.json();
})
    .then(data => {
        console.log(data);

        let $totalInbound = data.totalMinorsIn + data.totalAdultsIn + data.totalWcIn;
        let $totalOutbound = data.totalMinorsOut + data.totalAdultsOut + data.totalWcOut;
        
        // Adjusting HTML element to show data
        document.getElementById('currentAdults').textContent = data.currentAdults;
        document.getElementById('currentMinors').textContent = data.currentMinors;
        document.getElementById('currentWc').textContent = data.currentWc;
        document.getElementById('currentTotal').textContent = data.currentCapacity;

        document.getElementById('adultsTotalIn').textContent = data.totalAdultsIn;
        document.getElementById('adultsTotalOut').textContent = data.totalAdultsOut;

        document.getElementById('minorsTotalIn').textContent = data.totalMinorsIn;
        document.getElementById('minorsTotalOut').textContent = data.totalMinorsOut;

        document.getElementById('TotalIn').textContent = $totalInbound;
        document.getElementById('TotalOut').textContent = $totalOutbound;

        document.getElementById('wcTotalIn').textContent = data.totalWcIn;
        document.getElementById('wcTotalOut').textContent = data.totalWcOut;

        let $capacityMsg = "0";
        if (data.currentCapacity >= data.maxCapacity) {
            $capacityMsg = " !!! CAPACITY REACHED !!!";
        } else {
            $capacityMsg = "";
        }

        document.getElementById('maxCapacity').textContent = data.maxCapacity + $capacityMsg;
        document.getElementById('capacityEdit').placeholder = "Current Capacity: " + data.maxCapacity;

        document.getElementById('eventName').textContent = data.eventName;
        document.getElementById('eventNameEdit').placeholder = "Current Name: " + data.eventName;

        document.getElementById('errorPopup').style.display = "none";
        document.getElementById('errorMsg').textContent = "";

        // Updating entry block status / switch
        if (data.entryBlock == 1) {
            document.getElementById('entryStop').checked = true;
            document.getElementById('entryStat').textContent = "Entry Halted";
        } else {
            document.getElementById('entryStop').checked = false;
            document.getElementById('entryStat').textContent = "Entry Allowed";
        }


    })
    .catch(error => {
        console.log(error);
        document.getElementById('errorPopup').style.display = "block";
        document.getElementById('errorMsg').textContent = "Error establishing connection with Database.";
    }
    );
}


    let setCon = "https://primary-production-9330.up.railway.app/webhook/head_counter/settings";
    let tempTable = 1;

// TOGGLING THE ENTRY STATUS (WITH CONFIRMATION AND CANCLE)
function entryCheck () {
    var tog = document.getElementById('entryStop');

    let question = "?action=updateEntryblock";

    if (tog.checked) {
        let text = "Confirm you would like to halt entry?";
        if (confirm(text) == true) {
            alert("Entry has been halted!");

            let val = "&value=1";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        }

    } else {
        let text = "Confirm you would like to enable entry?";
        if (confirm(text) == true) {
            alert("Entry has been allowed!");

            let val = "&value=0";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        }
    }
}

// JS TO GO HERE FOR GETTING THE DB STATUS FOR ENTRY AND ADJUSTING TOGGLE ACCORDINGLY


// FETCHING THE INITAL ENTRY STATUS VIA THE CHECK BOX
function entryCheckInit () {
    var tog = document.getElementById('entryStop');

    if (tog.checked) {
        document.getElementById('entryStat').textContent = "Entry Halted";        
    } else {
        document.getElementById('entryStat').textContent = "Entry Allowed";
    }
}



// RESETTING HEAD COUNTER TABLE VALUES TO 0
function masterReset () {
    

    let text = "Confirm you would like to reset the head counter values to 0?";
    if (confirm(text) == true) {
        // CONFIRMING MASTER RESET
        let subText = "Are you sure you want to reset? (LAST CHANCE TO BACK OUT!)"
        if (confirm(subText) == true) {
            // MASTER RESET CONFIRMED
            alert("Table values have been reset!");

            let question = "?action=resetHeadcountertable"
            let val = "&value=0";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        } else {
            alert("Value reset cancelled.");
        }
        
    } else { 
        alert("Value reset cancelled.");
    }
}


// CONFIRMING EVENT NAME EDIT
function editEventName () {
    let newEventName = document.getElementById('eventNameEdit').value;
    let text = "Confirm you would like to adjust the event name to '" + newEventName + "'";
    if (newEventName != "") {
        if (confirm(text) == true) {
            // UPDATING EVENT NAME
            alert("Event name has been updated to '" + newEventName + "'");
            document.getElementById('eventNameEdit').value = "";

            let question = "?action=updateName"
            let val = "&value=" + newEventName;
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        } else {
            alert("Event name has NOT been adjusted.");
            document.getElementById('eventNameEdit').value = "";
        }
    } else {
        alert("You need to specify a new name before updating.")
    }
}


// CONFIRMING MAX CAPACITY EDIT
function editMaxCapacity () {
    let newCapacity = document.getElementById('capacityEdit').value;
    let text = "Confirm you would like to adjust the event capacity to '" + newCapacity + "'";
    if (newCapacity != "") {
        if (confirm(text) == true) {
            if (!isNaN(newCapacity)) {
                // UPDATING CAPACITY
                alert("Event capacity has been updated to '" + newCapacity + "'");
                document.getElementById('capacityEdit').value = "";

                let question = "?action=updateCapacity"
                let val = "&value=" + newCapacity;
                let eid = "&eid=" + tempTable;
                let toSend = setCon + question + val + eid;
                    fetch(toSend)

            } else {
                alert("ERROR > '" + newCapacity + "' IS AN INVALID NUMBER - Capacity not adjusted.");
                document.getElementById('capacityEdit').value = "";
            }
        } else {
            alert("Event capacity has NOT been adjusted.");
            document.getElementById('capacityEdit').value = "";
        }
    } else {
        alert("You need to specify a new capacity before updating.")
    }
}




// Re-requesting data every 1 seconds
// setInterval(() => dataCall(), 1000);
// Initial data request for first load
dataCall();