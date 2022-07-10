let infoWindow;
let markers = [];
let map;

function addMarker(location, name_en, id, map) {

  const marker = new google.maps.Marker({
    position: location,
    title: `${id}. ${name_en}`,
    label: `${id}`,
    map: map,
    optimized: false,
  });

  markers.push(marker);

  marker.addListener("click", () => {
    infoWindow.close();
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(marker.getMap(), marker);
  }
  );
}

async function initMap() {
  let res = await fetch("/gymroom");
  let gymRooms = await res.json();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 22.312085, lng: 114.087411 },
  });
  infoWindow = new google.maps.InfoWindow();
  for (let gymRoom of gymRooms) {
    const { longitude, latitude, id, name_en } = gymRoom

    // Add a marker at the center of the map.
    addMarker({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, name_en, id, map);
  }
}
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}


function hideMarkers() {
  setMapOnAll(null);
}


function deleteMarkers() {
  hideMarkers();
  markers = [];
}

window.initMap = initMap;

function showGymRoom(gymRoom) {
  const gymRoomList = document.querySelector(".gymroom-list");
  let gymRoomTemplate = document.querySelector("#template");
  const gymRoomContainer = gymRoomTemplate.cloneNode(true);
  gymRoomContainer.id = gymRoom.id;

  let gymRoomDistrict = gymRoomContainer.querySelector(".gymroom-district");
  let gymRoomName = gymRoomContainer.querySelector(".gymroom-name");
  let gymRoomAddress = gymRoomContainer.querySelector(".gymroom-address");
  let gymRoomSize = gymRoomContainer.querySelector(".gymroom-size");

  gymRoomContainer.setAttribute("data-latitude",gymRoom.latitude);
  gymRoomContainer.setAttribute("data-longitude",gymRoom.longitude);

  gymRoomDistrict.textContent = gymRoom.district_en;
  gymRoomName.textContent = gymRoom.name_en;
  gymRoomAddress.textContent = gymRoom.address_en;
  gymRoomSize.innerHTML = gymRoom.size_en;
  
  gymRoomList.appendChild(gymRoomContainer)


}

let gymRoomResult = [];

fetch("/gymroom")
  .then(res => res.json())
  .then((json) => {
    gymRoomResult = json;
    showGymRooms(gymRoomResult, document.querySelector("#district").value);
  });

document.querySelector("#district").addEventListener("change", async (event) => {
  let selectDistrict = event.target.value;
  const length = document.querySelectorAll(".gymroom").length
  for (let i = 1; i < length; i++) {
    document.querySelectorAll(".gymroom")[1].remove()
  }

  showGymRooms(gymRoomResult, selectDistrict)


  if (userLatitude !== undefined){
    calcDistance(userLatitude, userLongitude);
  } 
  

  deleteMarkers()
  for (let gymRoom of gymRoomResult) {
    const { longitude, latitude, id, name_en, district_en } = gymRoom
    if (selectDistrict == "All") {
      addMarker({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, name_en, id, map);
    } else if (selectDistrict == district_en) {
      addMarker({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, name_en, id, map);
    }
  }
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].position);
    // console.log(markers)
  }
  map.fitBounds(bounds);
})

function showGymRooms(gymRoomList, district) {
  gymRoomList.forEach((e) => {
    if (district == "All") {
      showGymRoom(e)

    } else if (e.district_en == district) {
      showGymRoom(e)
    }
    

  });
}

function calcDistance(userLatitude, userLongitude) {
  for(let gymroom of document.querySelectorAll(".gymroom")){
    let result = getDistanceFromLatLonInKm(userLatitude,userLongitude,gymroom.dataset.latitude,gymroom.dataset.longitude)
    let location = gymroom.querySelector(".location")
    location.textContent = result.toFixed(2) + " km";
    gymroom.querySelector(".location-div").style.visibility = "visible";
  }
}

let userLatitude;
let userLongitude;

const locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", () =>  {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position =>{
      userLatitude = position.coords.latitude
      userLongitude =  position.coords.longitude
      calcDistance(userLatitude,userLongitude)
      
      },
      error =>{
        Swal.fire('Your location is not available. Please make sure you have turn on location service on your device.')
      }

    );
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
})


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}