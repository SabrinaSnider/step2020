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

/* Fetches comment json data data from /comment and displays them */
function getComments() {
  console.log("getComments call")
  const container = document.getElementById("comment-list");

  fetch('/list-comments?x=2&y=3').then(response => response.json()).then(data => {
    console.log("get data is", data);
    data.forEach(comment => {
      container.appendChild(
        addComment(comment)
      );
    });
  })
}

/* Creates an <li> element containing text. */
function addComment(comment) {
  const commentItem = document.createElement("li");
  const commentName = document.createElement("p");
  const commentMessage = document.createElement("p");

  commentItem.classList.add("comment");
  commentName.classList.add("comment-name");
  commentMessage.classList.add("comment-message");

  commentName.innerText = comment.name;
  commentMessage.innerText = comment.message

  commentItem.appendChild(commentName);
  commentItem.appendChild(commentMessage);
  return commentItem;
}
