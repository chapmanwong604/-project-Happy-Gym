let sportsForm = document.querySelector('#manual-input-form');

sportsForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Serialize the Form afterwards
    try {
        const form = event.target
        const formObject = {}

        formObject['timer'] = form.timer.value
        formObject['sportstype'] = form.sportstype.value
        const res = await fetch('/recordsports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
        const result = await res.json()
        
        // Number Type Guard:
        if (result.error) {
            console.log("Manual input failed.")
            new swal({
                title: "Manual Input Failed",
                html: 'Please input numbers <span class="error-swal">ONLY</span> in Sports Duration.',
                icon: "error",
            })
            return;
        } else {
            console.log("Manual input success."),
                new swal({
                    title: "Manual Input Success",
                    text: "Sports Activity Recorded.",
                    icon: "success",
                    // button: "Go to HomePage"
                })
        }

        setTimeout(function replace(){window.location.replace("/profile.html")},1000)
    }
    catch (error) {
        console.log(error)
    }
})