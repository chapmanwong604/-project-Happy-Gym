let noSportsLogRecord = document.querySelector('#No-Sports-Record')
let SportsIcon = {
    Hiking:"<i class='fas fa-hiking'></i>",
    Training:"<i class='fas fa-dumbbell'></i>",
    Swimming:"<i class='fas fa-swimmer'></i>",
    Football:"<i class='material-icons'>sports_soccer</i>",
    Volleyball:"<i class='material-icons'>sports_volleyball</i>",
    Tennis:"<i class='material-icons'>sports_tennis</i>",
    HIIT:"<i class='fa fa-heartbeat'></i>",
    Yoga:"<i class='material-icons'>self_improvement</i>",
    Other:"<i> </i>",
    Skipping:"<i class='material-icons'>cable</i>",
    Boxing:"<i class='material-icons'>sports_mma</i>",
    Dance:"<i class='material-icons'>emoji_people</i>",
    "Body Stretching":"<i class='fas fa-person'></i>"
    
}

// Not a proper method:

// Template of HTML:
const sportsLogTemplate = (sportsLog) => `
<div class="log-no-${sportsLog.id} sports-log">
    <div class="sports-icon"> ${SportsIcon[sportsLog.sports_type]}</div>
    <!-- <div class="id log-info">Sports Log No. ${sportsLog.id}</div> -->
    <div class="date log-info">Date: ${moment(sportsLog.date_create).format("YYYY-MM-DD")}</div>
    <div class="timer log-info">Duration: ${sportsLog.timer} minutes</div>
    <div class="sports-type log-info">Sports Type: ${sportsLog.sports_type}</div>
    <button class="delete-no-${sportsLog.id}"><i class="bi bi-trash3"></i></button>
</div>`



async function loadSportsLog() {
    try {
        const res = await fetch("/sportslog");
        const sportsLogs = await res.json();  
        console.log(sportsLogs)      // Load the sports logs data in JSON form from sportslog.ts

        if(!sportsLogs[0]){
            noSportsLogRecord.style.display = "block";
        }
        
        // Return an array of sportsLogs in HTML template:
        const sportsLogHTML = sportsLogs.map(sportsLog => {
            return sportsLogTemplate(sportsLog);
        })
        
        const sportsLogContainer = document.querySelector('.sports-log-container');

        
        // sportsLogContainer.innerHTML = "";
        
        // Adding sports logs in HTML template into the sportsLogContainer with for-loop:
        for (let sportsLog of sportsLogHTML) {
            sportsLogContainer.innerHTML += sportsLog;
            
        }

        
        sportsLogs.map(sportsLog => {
            deleteSportsLog(sportsLog.id);    
        })

    } catch (error) {
        console.log(error);
    }
}

function deleteSportsLog (id) {
    document.querySelector(`.delete-no-${id}`).addEventListener("click",
        async (event) => {
            const res = await fetch(`sportsLog/${id}`,{
                method:"PATCH"
            });
            const result = await res.json();
            if (result.success){
                // loadSportsLog();
                const sportsLog = document.querySelector(`.log-no-${id}`);
                sportsLog.classList.add("hidden");
                location.reload();

            }            
        })
    
}

// Execute the functions whenever the page is loaded:
window.onload = async function () {
    await loadSportsLog();      // Load all the sports logs in the page
}