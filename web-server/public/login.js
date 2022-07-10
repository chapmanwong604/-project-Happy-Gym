const loginFrom = document.querySelector("#login-form");
loginFrom.addEventListener("submit", event => {
    event.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let formData = {username,password};
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.success){
            window.location.href="/homepage.html"
        }else{
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
