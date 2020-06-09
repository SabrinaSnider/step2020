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
