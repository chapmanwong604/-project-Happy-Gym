


let regForm = document.querySelector('#reg-form')

regForm.addEventListener('submit',async function (event){
    event.preventDefault()

    const form = event.target
    const formData= new FormData()


    formData.append('username', form.username.value)
    formData.append('password', form.password.value)
    formData.append('displayname', form.displayname.value)
    formData.append('weight', form.weight.value)
    formData.append('height', form.height.value)
    formData.append('gender', form.gender.value)
    formData.append('image', form.image.files[0])
    formData.append('password2', form.password2.value)

    const firstPW = formData.get('password')
    const secondPW = formData.get('password2')

    try{

        if (firstPW !== secondPW) {
            throw "Password Mismatch, please retry"
        };
    
        const res = await (fetch('/register', {
            method: 'POST',
            body: formData
        })
            .then(
                (result) => result.json()
            )
            .catch(error => ({ error: String(error) }))
            .then(json => {
                if (json.error) {
                    console.log("Fail01")
                    new swal({
                        title: "Registration Failed",
                        text: json.error,
                        icon: "error",
                    
                    })

                }else {
                    console.log("SUCCESS"),
                    new swal({
                        title: "Registration Success",
                        text: "Let's get started!!!",
                        icon: "success",
                        button:"Go to HomePage"
                              })
                setTimeout(function replace(){window.location.replace("/login.html")},3000)
                
                
                }

                
            })


        )
    }
    catch (err) {
        console.log("Failed02");
        new swal({
            title: "Registration Failed",
            text: err,
            icon: "error",
        });
    }
})

