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

/* Fetches json data from /data and displays them as an unordered list */
function getComments() {
  console.log("get comments call")
  const container = document.getElementById("comment-list");

  fetch('/comment').then(response => response.json()).then(data => {
    console.log("get data is", data);
    data.forEach(comment => {
      container.appendChild(
        createListElement(comment)
      );
    });
  })
}

/* Creates an <ul> element. */
// function createUnorderedList(data) {
//   console.log("unordered list data is", data)

//   const ulElement = document.createElement('ul');
//   data.forEach(comment => {
//     ulElement.appendChild(
//       createListElement(comment)
//     );
//   });
//   return ulElement;
// }

/* Creates an <li> element containing text. */
function createListElement(comment) {
  const liElement = document.createElement('li');

  liElement.innerText = comment.name + " " + comment.message;
  liElement.classList.add("comment")
  return liElement;
}
