
let socket = io.connect();

function showEvent(sportEvent){
    const showEventList = document.querySelector(".event-list");
    let eventTemplate = document.querySelector("#template");
    const eventContainer = eventTemplate.cloneNode(true);
    
    let eventName = eventContainer.querySelector(".event-name");
    let eventDate = eventContainer.querySelector(".event-date");
    let eventTime = eventContainer.querySelector(".event-time");
    let eventLocation = eventContainer.querySelector(".event-location");
    let eventGroupSize = eventContainer.querySelector(".event-group-size");
    let eventCurrentParticipant = eventContainer.querySelector(".event-participant")
    let eventAttendButton = eventContainer.querySelector(".attendBtn");

    eventAttendButton.setAttribute("data-eventid", sportEvent.id);
    eventContainer.id=`event-${sportEvent.id}`;
    eventAttendButton.id =`event-att-${sportEvent.id}`;

// XXXX = XXX.name <- database name 
    eventName.textContent = sportEvent.event_name;
    eventDate.textContent = moment(sportEvent.event_date).format("YYYY-MM-DD");
    eventTime.textContent = moment(sportEvent.event_time,"HH:mm:ss").format("HH:mm");
    eventLocation.textContent = sportEvent.event_location;
    eventGroupSize.textContent = sportEvent.event_max;
    if(sportEvent.no_of_participants==null){
        eventCurrentParticipant.textContent = "-" 
    }else{
        eventCurrentParticipant.textContent = sportEvent.no_of_participants;
    }
    if(sportEvent.event_max <=sportEvent.no_of_participants){
        eventAttendButton.disabled = true;
        eventAttendButton.innerHTML = "Full";
        
    }

    eventAttendButton.addEventListener("click",async (event) =>{
        event.preventDefault();
        // console.log(sportEvent.id)
        const res = await fetch("/attendancelist/",{
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                event_id:sportEvent.id
            })
        })
    
        const result = await res.json()
        if(result.success){
            new swal({
                title:"You are enrolled!",
                text: "Sports Event Enrolled.",
                icon: "success"
            })
            setTimeout(function replace(){window.location.replace("/createevent.html")},2000)
        }else{
            new swal({
                title:"Enrollment Failed!",
                text: result.error,
                icon: "error",
            })
        }
    })
    

    //eventContainer.removeAttribute("id");
    // console.log(sportEvent)
    showEventList.appendChild(eventContainer);
    // eventTemplate.remove();
    return sportEvent.id;
}


fetch("/eventlist")
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
        json.forEach(element => showEvent(element))
    })

socket.on('connect',() => {
    console.log('socket.io connected to server, id:', socket.id)
})

socket.on ('newEventCreated', newEvent => {
    console.log('socket.io received new event:', newEvent);
    showEvent(newEvent)
})