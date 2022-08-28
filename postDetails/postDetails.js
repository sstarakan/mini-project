let post = JSON.parse(localStorage.getItem('post'));

let postDiv = document.createElement('div');
let postTitle = document.createElement('h1');
let idTitle = document.createElement("h4");
let bodyPost = document.createElement('p');
let commentsDiv = document.createElement('div');

commentsDiv.className = 'comments-wrap'
postDiv.className = 'post-style';

postTitle.innerText = post.title;
idTitle.innerText = post.userId + ' - ' + post.id;
bodyPost.innerText = post.body;



fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
    .then(response => response.json())
    .then(comments => comments.forEach(comment => {
        let commentDiv = document.createElement('div');
        let commentName = document.createElement('h4');
        let idComment = document.createElement('p');
        let emailP = document.createElement('p');
        let bodyP = document.createElement('p');

        commentName.innerText = comment.name;
        idComment.innerText = comment.postId + '- ' + comment.id;
        emailP.innerText = comment.email;
        bodyP.innerText = comment.body;

        commentDiv.append(commentName ,idComment, emailP, bodyP)
        commentsDiv.appendChild(commentDiv)
    }))


postDiv.append(postTitle, idTitle, bodyPost)
document.body.append(postDiv, commentsDiv);
