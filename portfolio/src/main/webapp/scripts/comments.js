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
  displayComments();
}

/* Creates a new HTML element */
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
  displayComments();
}

/* Deletes all of the comments from the page and from datastore */
function deleteAllComments() {
  fetch('/delete-all-comments', { method: "post" });
  document.getElementById("comment-list").innerHTML = "";
}

/* Deletes a single comment from the page and from datastore */
function deleteComment(id) {
  fetch('/delete-comment?id=' + id, { method: "post" })
}

/* Fetches the comments from /comment-list with the user-selected sorting options */
function getComments() {
  const sortSelector = document.getElementById('comment-sort-select');
  const maxSelector = document.getElementById('comment-max-select');
  const sortDirectionIcon = document.getElementById("sort-icon");

  const sort = sortSelector.options[sortSelector.selectedIndex].value;
  const max = maxSelector.options[maxSelector.selectedIndex].value;
  const ascending = sortDirectionIcon.classList.contains("sort-up") ? "true" : "false";

  const query = `?sort=${sort}&max=${max}&ascending=${ascending}`;
  return fetch('/list-comments' + query).then(response => {return response.json();})
}

/* Reloads and displays all comments */
async function displayComments() {
  const userData = await getUserData();
  const isAdmin = userData.admin;
  const currentUserEmail = userData.email;

  const comments = await getComments();

  // Only display the comment form if the user is logged in
  if (currentUserEmail) {
    document.getElementById("comment-form").style.display = "flex";
    document.getElementById("comment-blocker").style.display = "none";
  }

  const container = document.getElementById("comment-list");
  container.innerHTML = "";

  comments.forEach(comment => {
    container.appendChild(
      addComment(comment, isAdmin, currentUserEmail)
    );
  });
  
  // show the delete all button if the user is an admin
  if (isAdmin) {
    const deleteAllButton = document.getElementById("delete-all-button");
    deleteAllButton.style.display = isAdmin ? "block" : "none";
  }
}

/* Adds a comment to datastore and prompt a reload of comments */
async function submitComment() {
  // get message text
  const message = document.getElementById("comment-input-message").value;

  // send ajax request to store comment
  const http = new XMLHttpRequest();
  http.open("POST", "/add-comment", true);
  http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  http.send("message=" + message);
  
  // refresh comments after post request completes
  http.onload = () => displayComments();
}

/* Creates an <li> element with comment information */
function addComment(comment, isAdmin, currentUserEmail) {
  console.log("comment stuff", isAdmin, currentUserEmail)
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
  commentItem.appendChild(commentMessage);

  // only let the user delete the comment if its their comment or if theyre and admin
  console.log(currentUserEmail === comment.email)
  if (isAdmin || currentUserEmail === comment.email) commentHeader.appendChild(commentDelete);

  return commentItem;
}
