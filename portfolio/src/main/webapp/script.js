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

/* Toggle on the delete all button if comments exist */
function toggleDeleteAll(show) {
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
  const ascending = sortDirectionIcon.classList[0] === "sort-up" ? "true" : "false";

  const query = "?sort=".concat(sort).concat("&max=").concat(max).concat("&ascending=").concat(ascending);

  container.innerHTML = "";
  fetch('/list-comments'.concat(query)).then(response => response.json()).then(data => {
    data.forEach(comment => {
      container.appendChild(
        addComment(comment)
      );
    });
    Object.keys(data).length > 0 ? toggleDeleteAll(true) : toggleDeleteAll(false);
  })
}

/* Creates an <li> element containing text. */
function addComment(comment) {
  const commentItem = document.createElement("li");
  const commentHeader = document.createElement("div");
  const commentName = document.createElement("p");
  const commentMessage = document.createElement("p");
  const commentDelete = document.createElement("img");

  commentItem.classList.add("comment");
  commentHeader.classList.add("comment-header");
  commentName.classList.add("comment-name");
  commentMessage.classList.add("comment-message");
  commentDelete.classList.add("comment-delete");

  commentName.innerText = comment.name;
  commentMessage.innerText = comment.message

  commentItem.appendChild(commentHeader);
  commentHeader.appendChild(commentName);
  commentHeader.appendChild(commentDelete);
  commentItem.appendChild(commentMessage);
  return commentItem;
}
