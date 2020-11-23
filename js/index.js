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
    const h4Title = document.createElement('h4')
    h4Title.innerText = obj.title
    const h4Sub = document.createElement('h4')
    h4Sub.innerText = obj.subtitle
    const h4Author = document.createElement('h4')
    h4Author.innerText = obj.author
    const p = document.createElement('p')
    p.innerText = obj.description

    panel.appendChild(pic)
    panel.appendChild(h4Title)
    panel.appendChild(h4Sub)
    panel.appendChild(h4Author)
    panel.appendChild(p)

    const userList = document.createElement('ul')
    //below iterates over each username on the users array of each bookObj
    obj.users.map(user => {
        const userLi = document.createElement('li')
        userLi.innerText = user.username
        userList.appendChild(userLi)
    })
    panel.appendChild(userList)

    const btn = document.createElement('button')
    btn.innerText = "LIKE"
    panel.appendChild(btn)
    btn.addEventListener('click', () => {
        if (btn.innerText == "LIKE"){
            btn.innerText = "UNLIKE"
            likeBook(obj, obj.id)
        } else {
            btn.innerText = "LIKE"
            unlikeBook(obj, obj.id)
        }
        toggleLike(obj, obj.id)
        })

    }

function likeBook(obj, id){
    fetch(userUrl)
    .then(resp => resp.json())
    .then(jsonStuff => {
        let user1 = jsonStuff[0]
        obj.users.push(user1)
    })

}

function unlikeBook(obj, id){
    fetch(userUrl)
    .then(resp => resp.json())
    .then(jsonStuff => {
        let user1 = jsonStuff[0]
        obj.users.delete(user1)
    
    })

}
    //sends a PATCH request to http://localhost:3000/books/:id
    //toggles between like/unlike the book by user1
function toggleLike(obj, id){
    fetch(`${bookUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(obj.users)
        })
        .then(res=>res.json())

}
