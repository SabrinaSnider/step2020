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

/* Create a new HTML element */
function createElementWithParams (tag, {
  className = "",
  innerText = "",
  event = undefined
} = {}) {
  const el = document.createElement(tag);

  el.classList.add(className);;
  el.innerText = innerText
  if (event) { el.addEventListener('click', event); }

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
  fetch('/delete-comment?id=' + id, { method: "post" }).then(() => {
    window.location.reload();
  })
}

/* Deletes all of the comments from the page and from datastore */
function deleteAllComments() {
  fetch('/delete-all-comments', { method: "post" }).then(() => {
    window.location.reload();
  })
}

/* Toggle on the delete all button if comments exist */
function toggleDeleteAllButton(show) {
  const deleteAllButton = document.getElementById("delete-all-button");
  deleteAllButton.style.display = show ? "block" : "none";
}

/* Fetches comment json data data from /comment and displays them */
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
    Object.keys(data).length > 0 ? toggleDeleteAllButton(true) : toggleDeleteAllButton(false);
  })
}

/* Creates an <li> element containing text. */
function addComment(comment) {
  const commentItem = createElementWithParams("li", { className: "comment" })
  const commentHeader = createElementWithParams("div", { className: "comment-header" })

  const commentName = createElementWithParams("p", { 
    className: "comment-name", 
    innerText: comment.name 
  })

  const commentMessage = createElementWithParams("p", { 
    className: "comment-message", 
    innerText: comment.message 
  })

  const commentDelete = createElementWithParams("img", { 
    className: "comment-delete", 
    event: { "click": () => deleteComment(comment.id) } 
  }) 

  commentItem.appendChild(commentHeader);
  commentHeader.appendChild(commentName);
  commentHeader.appendChild(commentDelete);
  commentItem.appendChild(commentMessage);
  
  return commentItem;
}
