// let displayName=document.querySelector(".profile-displayname")
// let weight=document.querySelector(".profile-weight")
// let height=document.querySelector(".profile-height")
// let ProfileImage=document.querySelector(".profile-image")
// let totalhours =document.querySelector(".profile-totalhours")
// let logout = document.querySelector(".logout")

// fetch('/userprofile')
//     .then(res=> res.json() )
//     .then(json => {
//         // console.log(json)
//         displayName.textContent=json.info[0].displayname
//         weight.textContent=+json.info[0].weight+" kg"
//         height.textContent=json.info[0].height+" cm"
//         if (!json.info[0].profilepic){
//             ShowImage('No_Image.jpeg')
//         }else{
//             ShowImage(json.info[0].profilepic)
    
//         }
// })

// function ShowImage(imageFromJSON){
//     let image = new Image()
//     image.src='/uploads/'+imageFromJSON
//     ProfileImage.appendChild(image)
// }

// logout.addEventListener("click",
// async (event)=>{
//     fetch("/logout", {
//         method: 'POST'
//     }).then(res=>res.json())
//     .then(result=>{
//         if(result.success){
//             window.location.href="/login.html"
//         }else{
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Login Failed',
//                 text: result.error
//             })
//         }
//     })
//     .catch(error => (
//          console.error(error) 
//         ))
    

// })

// fetch("/usertotalhour")
// .then(res=>res.json())
// .then(json=>{
//     // console.log(json)
//     totalhours.textContent = Math.floor((json.info[0].totalhours)/60) + " hour(s) " + ((json.info[0].totalhours)%60) + " min(s)"
// })
