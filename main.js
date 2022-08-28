let usersDiv = document.createElement('div');
usersDiv.className = 'wrap-div';

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            let userDiv = document.createElement('div');
            let userTitle = document.createElement('h3');
            let detailsButton = document.createElement('button');

            userDiv.className = 'user-div';

            userTitle.innerText = user.id + ' ' + user.name;
            detailsButton.innerText = 'Details';

            detailsButton.onclick = function () {
                localStorage.setItem('user', JSON.stringify(user));
                location.href = 'userDetails/user-details.html';
            }

            userDiv.append(userTitle, detailsButton);
            usersDiv.appendChild(userDiv);
            }
        )
    })

document.body.appendChild(usersDiv);