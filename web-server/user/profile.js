let displayName=document.querySelector("#profile-displayName")
let gender=document.querySelector("#profile-gender")
let weight=document.querySelector("#profile-weight")
let height=document.querySelector("#profile-height")
let ProfileImage=document.querySelector("#profile-image")
let editForm = document.querySelector('#UpdateFormContainer')
let displayName2 = document.querySelector('#displayname2')
let weight2 = document.querySelector('#weight2')
let height2 = document.querySelector('#height2')
let editProfileButton = document.querySelector('#Edit-Profile')


editProfileButton.addEventListener('click', function(){
    editForm.style.display="block";
})

fetch('/userprofile')
    .then(res=> res.json() )
    .then(json => {
        displayName.textContent="Display Name :"+json.info[0].displayname
        gender.textContent="Gender: "+json.info[0].gender
        weight.textContent="Weight: "+json.info[0].weight+" kg"
        height.textContent="Height: "+json.info[0].height+" cm"
        displayName2.value=json.info[0].displayname
        weight2.value=json.info[0].weight
        height2.value=json.info[0].height


        if (!json.info[0].profilepic){
            ShowImage('No_Image.jpeg')
        }else{
            ShowImage(json.info[0].profilepic)
    
        }
        if (json.error) {
          alert(json.error)
          return
        }})

function ShowImage(imageFromJSON){
    let image = new Image()
    image.src='/uploads/'+imageFromJSON
    ProfileImage.appendChild(image)
}

editForm.addEventListener('submit',async function (event) {
    event.preventDefault()

    const form =event.target
    const formData = new FormData()

    formData.append('editImage', form.editImage.files[0])
    formData.append('editDisplayname', form.editDisplayname.value)
    formData.append('editWeight', form.editWeight.value)
    formData.append('editHeight', form.editHeight.value)

    
    
        const res = await (fetch('/editProfile', {
            method: 'PATCH',
            body: formData
        })
            .then(
                (result) => console.log(result),
                console.log("SUCCESS"),
                new swal({
                    title: "Update Success",
                    icon: "success",
                          })
                          .then((result)=>{location.reload()})
            )
            .catch(error => ({ error: String(error) }))
            .then(json => {
                if (json.error) {
                    console.log("Fail01")
                    new swal({
                        title: "Update Profile Failed",
                        text: json.error,
                        icon: "error",
                    
                    })

                }
                
            })


        )
    })
