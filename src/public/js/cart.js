    console.log("cart on");

function changeQuantity(cid, pid = id, quantity) {
  const data = { quantity };
  const url = `/api/carts/${cid}/product/${pid}`;

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
  location.reload();
}

function deleteProduct(cid, pid = id) {
  const url = `/api/carts/${cid}/product/${pid}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "DELETE";

  fetch(url, {
    headers,
    method,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  location.reload();
}

function deleteCart(cid){
    const url = `/api/carts/${cid}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "DELETE";
  
    fetch(url, {
      headers,
      method,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    location.reload();
}

function purchaseCart(cid){
    const url = `/api/carts/${cid}/purchase`;
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "POST";
  
    fetch(url, {
      headers,
      method,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "http://localhost:8080/ticket";
    })
    .catch((error) => console.log(error));
}