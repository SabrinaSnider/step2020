/* Helper function that returns user email and admin status */
async function getUserData() {
  return fetch('/user-data', { method: "get" }).then(response => response.json()).then(data => {
    data.admin = data.admin === "true";
    return data;
  });
}

/* Set the Login/Logout text and URL in the navbar */
function setLoginLogoutURL() {
  const loginLogoutLink = document.getElementById("login-logout-link");
  fetch('/login-logout-url', { method: "get" }).then(response => response.json()).then(data => {
    if (data.login) {
      loginLogoutLink.innerText = "Login";
      loginLogoutLink.href = data.login;
    } else {
      loginLogoutLink.innerText = "Logout"
      loginLogoutLink.href = data.logout;
    }
  })
}
