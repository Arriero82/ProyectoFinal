console.log("desde hbs");

function changeRole(email, newRole) {
  const url = "/api/users/role";
  const data = {email, newRole}
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "PATCH";
  const body = JSON.stringify(data);
  
  fetch(url, {
    headers,
    method,
    body,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  location.reload()
}

function deleteUser(email) {
    const url = "/api/users/delete";
    const data = {email}
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "DELETE";
    const body = JSON.stringify(data);
    
    fetch(url, {
      headers,
      method,
      body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    location.reload()
}
