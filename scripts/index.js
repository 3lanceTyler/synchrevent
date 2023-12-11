function submitEntryCode () {
    let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/access_code_login_attempt";
    let question = "?providedCode=";
    let code = document.getElementById('LCI1').value + document.getElementById('LCI2').value + document.getElementById('LCI3').value + document.getElementById('LCI4').value + document.getElementById('LCI5').value + document.getElementById('LCI6').value;
    let url = con + question + code;


    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {

        console.log(data);
        

        if (data.verification) {

            document.getElementById('errorPopup').style.display = "block";
            document.getElementById('errorPopup').style.backgroundColor = "green";
            document.getElementById('errorMsg').textContent = "Access Code Successful!";

            document.getElementById('loginCodeForm').style.display = "none";
            document.getElementById('loginCodeSubmit').style.display = "none";


                setTimeout(() => {
                    document.getElementById('errorMsg').textContent = "Fetching Details..";
                    sessionStorage.setItem("eventID", data.eventID);

                    setTimeout(() => {
                        document.getElementById('errorMsg').textContent = "Event Found!";
                        setTimeout(() => {
                            document.getElementById('errorMsg').textContent = "Loading '" + data.eventName + "'."
                            setTimeout(() => {
                                document.getElementById('errorMsg').textContent = "'" + data.eventName + "' Loaded!"
                                setTimeout(() => {
                                    document.getElementById('errorMsg').textContent = "Redirecting To '" + data.eventName + "'.";
                                    setTimeout(() => {
                                        window.location.href = "headCounter.html";
                                    }, 1000);
                                }, 2000);
                            }, 1500);
                        }, 1500);
                    }, 1500);
                }, 2000);
            

        } else {

            document.getElementById('errorPopup').style.display = "block";
            document.getElementById('errorMsg').textContent = "Invalid Access Code - Try Again";
            document.getElementById('errorPopup').style.backgroundColor = "red";

            document.getElementById('LCI1').value = "", document.getElementById('LCI2').value = "", document.getElementById('LCI3').value = "", document.getElementById('LCI4').value = "", document.getElementById('LCI5').value = "", document.getElementById('LCI6').value = "";

        }

    })
    .catch(error => {
        console.log(error);
        document.getElementById('errorPopup').style.display = "block";
        document.getElementById('errorMsg').textContent = "Error establishing connection with Database.";
        document.getElementById('errorPopup').style.backgroundColor = "red";

        document.getElementById('LCI1').value = "", document.getElementById('LCI2').value = "", document.getElementById('LCI3').value = "", document.getElementById('LCI4').value = "", document.getElementById('LCI5').value = "", document.getElementById('LCI6').value = "";

    })
}


function entryCodeResetter () {
    document.querySelector('#LCI1').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
    document.querySelector('#LCI2').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
    document.querySelector('#LCI3').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
    document.querySelector('#LCI4').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
    document.querySelector('#LCI5').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
    document.querySelector('#LCI6').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitEntryCode()
        }
    });
}


function contactInfo () {
    let $contactEmail = "3lanceTyler@gmail.com";
    let $emailSubject = "Synchrevent Help";

    document.getElementById('adminContactAdd').textContent = $contactEmail;
    document.getElementById('emailSubjectLine').textContent = $emailSubject;
}