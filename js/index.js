//Get a list of books & render them
const bookUrl = 'http://localhost:3000/books'
const userUrl = 'http://localhost:3000/users'
document.addEventListener("DOMContentLoaded", () => {
    fetchListOfBooks()
});

function fetchListOfBooks(){
    fetch(bookUrl)
    .then(res => res.json())
    .then(jsonData => showList(jsonData))
}

function showList(bookArray){
    bookArray.map(book => {
        renderList(book)
    })
}
//clickable book title
//when clicked, thumbnail, description, and users would show

function renderList(bookObj){
    const ul = document.querySelector('ul')

    const li = document.createElement('li')
    ul.appendChild(li)
    li.innerText = `${bookObj.title}`

    li.addEventListener('click', (e) => showPanel(e, bookObj))
}

function showPanel(event, obj){
    const panel = document.querySelector("#show-panel")
    while(panel.firstChild) {
        panel.removeChild(panel.firstChild)
    }
    const pic = document.createElement('img')
    pic.setAttribute('src', `${obj.img_url}`)
    const h3Title = document.createElement('h3')
    h3Title.innerText = obj.title
    const h4Sub = document.createElement('h4')
    h4Sub.innerText = obj.subtitle
    const h4Author = document.createElement('h4')
    h4Author.innerText = obj.author
    const p = document.createElement('p')
    p.innerText = obj.description

    panel.appendChild(pic)
    panel.appendChild(h3Title)
    panel.appendChild(h4Sub)
    panel.appendChild(h4Author)
    panel.appendChild(p)

    const userList = document.createElement('ul')
    userList.id = 'list-of-likes'
    //below iterates over each username on the users array of each bookObj
    obj.users.forEach(user => {
        const userLi = document.createElement('li')
        userLi.innerText = user.username
        userList.appendChild(userLi)
    })
    panel.appendChild(userList)

    const btn = document.createElement('button')
    btn.innerText = "LIKE"
    panel.appendChild(btn)
    btn.addEventListener('click', () => {
        toggleBtn(obj)
        })

    }
//there maybe a better way but fetching twice dependent on toggle seems a long route.
function toggleBtn(obj){
    const theBtn = document.querySelector('button')
    const id = obj.id
    const user = {"id":1, "username":"pouros"}

    if (theBtn.innerText == "LIKE"){
        theBtn.innerText = "UNLIKE"
        fetch(`${bookUrl}/${id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({users: obj.users.concat(user)})
          })
          .then(res=>res.json())
          .then(json=>addLike(obj))
    } else {
        theBtn.innerText = "LIKE"
        fetch(`${bookUrl}/${id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({users: obj.users.pop(user)})
          })
          .then(res=>res.json())
          .then(json => removeLike(obj))

    }

}

function addLike(book){
    const user = {"id":1, "username":"pouros"}
    const list = document.querySelector('#list-of-likes')
    const newUser = document.createElement('li')

    newUser.innerText = user.username
    list.appendChild(newUser)
}

function removeLike(book){
    const user = {"id":1, "username":"pouros"}
    const list = document.querySelector('#list-of-likes')
//if user exists on list, remove it from list. this is knowing it's the last child on 
//the list of users who liked the book.
    if (user) {
        list.removeChild(list.lastChild)
    }
}