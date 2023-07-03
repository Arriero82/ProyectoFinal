console.log('on');

// Función para comprar un producto
function comprar(id, quantity) {        
    const email = document.getElementById("userEmail").value;
    const url = "/api/carts/";
    const data = {id, quantity, email}
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "PUT";
  const body = JSON.stringify(data);
  
  fetch(url, {
    headers,
    method,
    body,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}


