// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* Function called on page load to show comments and check if the user can comment */
async function init() {
  setLoginLogoutURL();
  getComments();

  isLoggedIn().then(email => { // block comment form if not logged in
    console.log(email)
    if (email) {
      document.getElementById("comment-form").style.display = "flex";
      document.getElementById("comment-blocker").style.display = "none";
    }
  })
}

/* Helper function to check if the user is logged in */
async function isLoggedIn() {
  return fetch('/user', { method: "get" }).then(response => response.json()).then(data => {
    if (data.error) {
      console.log(data.error);
      return undefined;
    } else {
      console.log("returning", data.email)
      return data.email;
    }
  })
}

/* Set the Login/Logout text and URL */
function setLoginLogoutURL() {
  const authLink = document.getElementById("auth-link");
  fetch('/auth-url', { method: "get" }).then(response => response.json()).then(data => {
    if (data.login) {
      authLink.innerText = "Login";
      authLink.href = data.login;
    } else {
      authLink.innerText = "Logout"
      authLink.href = data.logout;
    }
  })
}

/* Create a new HTML element */
function createElementWithParams (tag, {
  className = "",
  innerText = "",
  onclick = undefined,
} = {}) {
  const el = document.createElement(tag);

  el.classList.add(className);
  el.innerText = innerText
  el.onclick = onclick;

  return el;
}

/* Toggles the sort between ascending and descending, then updates comments */
function toggleSort() {
  const sortDirectionIcon = document.getElementById("sort-icon");
  if (sortDirectionIcon.classList[0] === "sort-down") {
    sortDirectionIcon.classList.remove('sort-down');
    sortDirectionIcon.classList.add('sort-up');
  } else {
    sortDirectionIcon.classList.remove('sort-up');
    sortDirectionIcon.classList.add('sort-down');
  }
  getComments();
}

/* Deletes a single comment from the page and from datastore */
function deleteComment(id) {
  fetch('/delete-comment?id=' + id, { method: "post" })
}

/* Deletes all of the comments from the page and from datastore */
function deleteAllComments() {
  fetch('/delete-all-comments', { method: "post" });
  document.getElementById("comment-list").innerHTML = "";
}

/* Fetches comment data from /comment-list and displays them */
function getComments() {
  const container = document.getElementById("comment-list");

  const sortSelector = document.getElementById('comment-sort-select');
  const maxSelector = document.getElementById('comment-max-select');
  const sortDirectionIcon = document.getElementById("sort-icon");

  const sort = sortSelector.options[sortSelector.selectedIndex].value;
  const max = maxSelector.options[maxSelector.selectedIndex].value;
  const ascending = sortDirectionIcon.classList.contains("sort-up") ? "true" : "false";

  const query = `?sort=${sort}&max=${max}&ascending=${ascending}`;

  container.innerHTML = "";
  fetch('/list-comments' + query).then(response => response.json()).then(data => {
    data.forEach(comment => {
      container.appendChild(
        addComment(comment)
      );
    });
    // show "delete all" button if comments are present
    const deleteAllButton = document.getElementById("delete-all-button");
    deleteAllButton.style.display = Object.keys(data).length > 0 ? "block" : "none";
  })
}

/* Adds a comment to datastore and prompt a reload of comments */
function submitComment() {
  // get current user
  const email = isLoggedIn();
  if (email === undefined) return;

  // get message text
  const message = document.getElementById("comment-input-message").value;

  // send ajax request to store comment
  var http = new XMLHttpRequest();
  http.open("POST", "/add-comment", true);
  http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  http.send("email=" + email + "&message=" + message);

  // refresh comments after post request completes
  http.onload = () => getComments();
}

/* Creates an <li> element with comment information */
function addComment(comment) {
  const commentItem = createElementWithParams("li", {className: "comment"})
  const commentHeader = createElementWithParams("div", {className: "comment-header"})

  const commentEmail = createElementWithParams("p", { 
    className: "comment-email", 
    innerText: comment.email,
  })

  const commentMessage = createElementWithParams("p", { 
    className: "comment-message", 
    innerText: comment.message,
  })

  const commentDelete = createElementWithParams("img", { 
    className: "comment-delete", 
    onclick: () => {deleteComment(comment.id); commentItem.remove();},
  }) 

  commentItem.appendChild(commentHeader);
  commentHeader.appendChild(commentEmail);
  commentHeader.appendChild(commentDelete);
  commentItem.appendChild(commentMessage);
  
  return commentItem;
}
