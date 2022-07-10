const html = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet"/>
<link rel='stylesheet' href='nav.css'/>
<div class="d-flex justify-content-between align-items-center app">
    <div id="navbar-left" >
        <a href='./homepage.html'>Happy Gym</a>
    </div>
    <div id="navbar-right">
        <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">


                            <div class="nav-profile-image">
                            </div>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Hi! <span class="profile-displayname"></span>
                                </a>

                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item">Height: <span class="profile-height"></span> </a></li>
                                    <li><a class="dropdown-item">Weight: <span class="profile-weight"></span></a></li>
                                    <li><a class="dropdown-item">Total Hours: <span class="profile-totalhours">0</span></a></li>
                                    <li><a class="dropdown-item" href="/profile.html">More Details......</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item" href="/createevent.html">Create & Manage Sports Event</a></li>
                                    <li><a class="dropdown-item" href="/eventlist.html">Enroll Sports Event </a></li>
                                    <li>
                                    <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item" href="/gymroom.html">Information of Fitness Rooms</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item logout">Logout</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
</div>
`

function loadHeader() {
    let header = document.querySelector('nav');
    header.outerHTML = html;
    let script = document.createElement("script");  // create a script DOM node
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";  // set its src to the provided URL
    document.querySelector('body').parentElement.appendChild(script);
}

loadHeader();

let navDisplayName = document.querySelector("nav .profile-displayname")
let navWeight = document.querySelector("nav .profile-weight")
let navHeight = document.querySelector("nav .profile-height")
let navProfileImage = document.querySelector(".nav-profile-image")
let navTotalhours = document.querySelector("nav .profile-totalhours")
let navLogout = document.querySelector("nav .logout")

fetch('/userprofile')
    .then(res => res.json())
    .then(json => {
        // console.log(json)
        navDisplayName.textContent = json.info[0].displayname
        navWeight.textContent = json.info[0].weight + " kg"
        navHeight.textContent = json.info[0].height + " cm"
        if (!json.info[0].profilepic) {
            navShowImage('No_Image.jpeg')
        } else {
            navShowImage(json.info[0].profilepic)

        }
    })

function navShowImage(imageFromJSON) {
    let image = new Image()
    image.src = '/uploads/' + imageFromJSON
    navProfileImage.appendChild(image)
}

navLogout.addEventListener("click",
    async (event) => {
        fetch("/logout", {
            method: 'POST'
        }).then(res => res.json())
            .then(result => {
                if (result.success) {
                    window.location.href = "/login.html"
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: result.error
                    })
                }
            })
            .catch(error => (
                console.error(error)
            ))


    })

fetch("/usertotalhour")
    .then(res => res.json())
    .then(json => {
        // console.log(json)
        navTotalhours.textContent = Math.floor((json.info[0].totalhours) / 60) + " hour(s) " + ((json.info[0].totalhours) % 60) + " min(s)"
    })






