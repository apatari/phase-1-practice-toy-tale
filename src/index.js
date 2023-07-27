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
  });
});

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(data => renderToys(data))

function renderToys(toys) {
  
  toys.forEach(toy => renderToy(toy))
    
  
}

const toyForm = document.querySelector('form')
toyForm.addEventListener('submit', (e) => newToy(e))


function renderToy(toy) {
  card = document.createElement('div')
  card.className = 'card'
    card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} width="100%">
  <p>${toy.likes} likes</p>
  
  `
  btn = document.createElement('button')
  btn.id = toy.id
  btn.className = 'like-btn'
  btn.textContent = 'Like ❤️'

  btn.addEventListener('click', () => {increaseLikes(toy.id, toy.likes)})

  card.append(btn)

  document.getElementById('toy-collection').append(card)
}

function increaseLikes(id, likes) {
  likes += 1
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  .then(response => response.json())
  .then(data => updateLike(data))
}

function updateLike(data) {
  const button = document.getElementById(`${data.id}`)
  button.addEventListener('click', () => {increaseLikes(data.id, data.likes)})
  likesP = button.previousElementSibling
  
  likesP.textContent = `${data.likes} likes`

}

function newToy(e) {
  e.preventDefault()
  let toyObject = {
    name: e.target.toyName.value,
    image: e.target.toyImage.value,
    likes: 0
  }
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
  .then(res => res.json())
  .then(data => renderToy(data))
}