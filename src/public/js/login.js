const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const headers = {
    "Content-Type": "application/json",
  };
  const method = "POST";
  const body = JSON.stringify(obj);

  // Realizar la solicitud a /api/auth
  fetch("/api/auth", {
    headers,
    method,
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        // Realizar la solicitud a /api/carts
        fetch("/api/carts", {
          headers,
          method,
          body,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            window.location.href = "http://localhost:8080/profile";
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});
