/* Helper function to check if the user is logged in */
async function getUserEmail() {
  return fetch('/user', { method: "get" }).then(response => response.json()).then(data => {
    if (data.error) {
      console.log(data.error);
      return undefined;
    } else {
      return data.email;
    }
  })
}

/* Helper function to check if the user is an admin */
async function isAdmin() {
  return fetch('/is-admin', { method: "get" }).then(response => response.json()).then(data => {
    return data.admin;
  })
}

/* Set the Login/Logout text and URL in the navbar */
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
