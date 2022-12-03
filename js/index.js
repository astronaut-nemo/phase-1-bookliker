let userInfo = {
    id: 1, username: "pouros"
};

document.addEventListener("DOMContentLoaded", function() {
    // List books by title on page load
    getBooks();
    // Set user
    // userId = window.prompt('Select user ID: 1-10');
    // const user = fetch the user with the given id using getUser()
});

function getBooks(){
    fetch('http://localhost:3000/books').then((response) => response.json()).then((data) => createTitleList(data))
}

function createTitleList(books){
    const listPanel = document.getElementById('list');
    books.forEach(book => {
        let bookTitle = document.createElement('li');
        bookTitle.textContent = book.title;
        bookTitle.setAttribute('id', `${book.id}`)
        bookTitle.addEventListener('click', fetchBookDetails)

        listPanel.appendChild(bookTitle)
    });
}

function fetchBookDetails(){
    // Fetch the details of that book
    fetch(`http://localhost:3000/books/${event.target.id}`).then((response) => response.json()).then((data) => createBookDisplay(data))
}

function createBookDisplay(book){
        // Create and display the details for that book
        const showPanel = document.getElementById('show-panel');

        let bookDisplay = document.createElement('div');
        bookDisplay.innerHTML = `
            <img src="${book.img_url}"/>
            <h2>${book.title}</h2>
            <h2>${book.subtitle}</h2>
            <h2>${book.author}</h2>
            <p>${book.description}</p>
            <ul id="likes-list">
                
            </ul>
            <button class="like-btn" id="">Like</button>
        `

        // Add the likes list
        book.users.forEach((userLike) => {
            const like = document.createElement('li');
            like.setAttribute('id', `${userLike.id}`);
            like.textContent = `${userLike.username}`;
            bookDisplay.querySelector('#likes-list').appendChild(like);
        })

        // Display the book's details on the DOM
        showPanel.innerHTML = bookDisplay.innerHTML;
        // Add event listener to Like button (only works if placed after the book's details are displayed on the DOM)
        const likeBtn = document.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => {
            addLike(book)
        })
}


function addLike(book){
    // Send a PATCH request
    // Take the user id set at the beginning and use it to patch a like to that book specifically
    book.users.push(userInfo)

    return fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
                "users": book.users
            })
    }).then((response) => response.json()).then((data) => {
        document.getElementById('likes-list');

    })
}

