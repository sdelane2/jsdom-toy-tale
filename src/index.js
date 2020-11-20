let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  //   function formData(event) {
  //     event.preventDefault()
  //     const newToy = {
  //       'name': event.target.name,
  //       'image': event.target.image,
  //       'likes': 0
  //     }
      
    
  //   }

  //   fetch('http://localhost:3000/toys', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(newToy)
  //   })
  //   .then(resp => resp.json())
  //   .then(data => console.log(data))
  
  
  
  // formData(event)
});
// const card = document.createElement(".card")
const divId = document.querySelector("#toy-collection")
const likeButton = document.querySelector(".like-btn")
const toyForm = document.querySelector('.add-toy-form')

  divId.addEventListener("click", addLikesToToys)
  function addLikesToToys(event) {
    if (event.target.matches(".like-btn")){
      const button = event.target
      const card = button.closest(".card")
      
      const id = card.dataset.id
      const likes = card.querySelector("p")
      const newLikes = parseInt(likes.textContent) + 1
      likes.textContent = `${newLikes} likes`
    

      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({id: id, likes: newLikes })
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }

    
  }
  

  

  toyForm.addEventListener('submit', event => {
    event.preventDefault()

    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }


    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(data => renderToy(data))

    

    event.target.reset()
  })

  // Requests
  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(data => {
    // console.log(data)
    data.forEach(toy => renderToy(toy))
  })

  // Rendering
  function renderToy(data) {
      const toyDiv = document.createElement('div')
      toyDiv.classList.add('card')
      toyDiv.dataset.id = data.id
      toyDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src=${data.image} class="toy-avatar" />
      <p>${data.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      divId.append(toyDiv)
  }



});
