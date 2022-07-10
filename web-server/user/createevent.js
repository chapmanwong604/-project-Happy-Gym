let eventForm = document.querySelector('#create-event-form');

eventForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Serialize the Form afterwards
    try {

        const form = event.target
        const formObject = {}
        formObject['createeventname'] = form.createeventname.value;
        formObject['createdate'] = form.createdate.value;
        formObject['createtime'] = form.createtime.value;
        formObject['createlocation'] = form.createlocation.value;
        formObject['createlimit'] = form.createlimit.value;
        const res = await fetch('/newevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
        const result = await res.json();

        if (result.user_id) {
            if (result.success) {
                new swal({
                    icon: 'success',
                    title: 'New Event Created',
                    html: `You have created a New Event - <span class="success-swal">${form.createeventname.value}</span>.`
                })
                setTimeout(function replace(){window.location.replace("/eventlist.html")},2000)

                // Should refresh here:
                // document.querySelector('.event-name').innerHTML = result.eventName;
                // document.querySelector('.date').innerHTML = result.eventDate;
                // document.querySelector('.time').innerHTML = result.eventTime;
                // document.querySelector('.location').innerHTML = result.eventLocation;
                // document.querySelector('.amount-limit').innerHTML = result.eventLimit;

            } else {
                new swal({
                    icon: 'error',
                    title: 'Event Cannot be Created.',
                    text: result.error
                })
            }
        } else {
            new swal({
                icon: 'error',
                title: 'Event Cannot be Created.',
                html: `<span class="error-swal"> Please Login Before you Attempt to Create a New Event.</span>`
            })
        }

    } catch (error) {
        console.log(error);
    }
})


function showEvent(sportEvent){
    const showEventList = document.querySelector(".event-list");
    let eventTemplate = document.querySelector("#template");
    const eventContainer = eventTemplate.cloneNode(true);
    
    let eventName = eventContainer.querySelector(".event-name");
    let eventDate = eventContainer.querySelector(".event-date");
    let eventTime = eventContainer.querySelector(".event-time");
    let eventLocation = eventContainer.querySelector(".event-location");
    // let eventGroupSize = eventContainer.querySelector(".event-group-size");
    // let eventCurrentParticipant = eventContainer.querySelector(".event-participant")
    // let eventAttendButton = eventContainer.querySelector(".attendBtn");

    // eventAttendButton.setAttribute("data-eventid", sportEvent.id);

// XXXX = XXX.name <- database name 
    eventName.textContent = sportEvent.event_name;
    eventDate.textContent = moment(sportEvent.event_date).format("YYYY-MM-DD");
    eventTime.textContent = moment(sportEvent.event_time,"HH:mm:ss").format("HH:mm");
    eventLocation.textContent = sportEvent.event_location;
    // eventGroupSize.textContent = sportEvent.event_max;
    // eventCurrentParticipant.textContent = sportEvent.no_of_participants;

    // if(sportEvent.event_max <=sportEvent.no_of_participants){
    //     eventAttendButton.disabled = true;
    //     eventAttendButton.innerHTML = "Full";
    // }

    // eventContainer.removeAttribute("id");
    // console.log(sportEvent)
    showEventList.appendChild(eventContainer);
}


// const res = await fetch("/eventlist");
// const result = await res.json();
// console.log(result);

// result.forEach(element => showEvent(element));

fetch("/event")
.then(res=>res.json())
.then(json=>{
    console.log(json)
    json.forEach(element => showEvent(element))
    let eventTemplate = document.querySelector("#template");
    eventTemplate.remove();
})



// Execute the functions whenever the page is loaded:
// window.onload = async function () {
//     await showEventsLog();      // Load all the event logs in the page
// }