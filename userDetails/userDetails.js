let user = JSON.parse(localStorage.getItem('user'));

let firstCharToUpperCase = (string) => string[0].toUpperCase() + string.slice(1)

let liCreator = (parentUl, object, keysIgnoreListArray) => {
    for (const key in object) {
        if (keysIgnoreListArray === undefined ? true : !keysIgnoreListArray.includes(key)) {
            let liInfo = document.createElement('li');
            if (typeof object[key] !== 'object') {
                liInfo.innerText =  firstCharToUpperCase(key) + ': ' + object[key];
            } else {
                let childUl = document.createElement('ul')
                childUl.innerHTML = `<b style="margin-left: -40px">${firstCharToUpperCase(key)}:</b>`;
                liCreator(childUl, object[key]);
                liInfo.appendChild(childUl);
            }
            parentUl.appendChild(liInfo);
        }
    }
}

let userDetailsDiv = document.createElement('div');
let userHeadDiv = document.createElement('div');
let nameH1 = document.createElement('h1');
let mainInfoList = document.createElement('ul');
let userPostButton = document.createElement('button');

userDetailsDiv.className = 'user-details-div';
nameH1.innerText = user.name + ' - ' + `'${user.username}'`;

liCreator(mainInfoList, user, ['name', 'username']);

userPostButton.className = 'posts-button'
userPostButton.innerText = 'View user posts';

let postsListDiv = document.createElement('div');
postsListDiv.className = 'post-wrap';
let toggle = true;
userPostButton.onclick = () => {

    if (toggle) {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
            .then(response => response.json())
            .then(posts => posts.forEach(post => {

                let postDiv = document.createElement('div');
                let idTitle = document.createElement('p');
                let postTitle = document.createElement('h4');
                let detailsPostButton = document.createElement('button');

                postDiv.className = 'post';

                idTitle.innerText = post.userId + '- ' + post.id;
                postTitle.innerText = post.title;
                detailsPostButton.innerText = 'View post details';
                detailsPostButton.onclick = () => {
                    localStorage.setItem('post', JSON.stringify(post));
                    location.href = '../postDetails/post-details.html'
                }

                postDiv.append(idTitle, postTitle, detailsPostButton);
                postsListDiv.appendChild(postDiv);
                toggle = false
            }))
    } else {
        postsListDiv.classList.toggle('display-changer');
    }
}

userHeadDiv.append(nameH1, mainInfoList);
userDetailsDiv.append(userHeadDiv, userPostButton);
document.body.append(userDetailsDiv, postsListDiv);