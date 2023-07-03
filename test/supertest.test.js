import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Test de la API", () => {
  const productMock = {
    title: "campera blanca",
    description: "campera blanca hombre",
    code: "abz898",
    price: 25000,
    stock: 20,
    category: "campera",
    thumbnails: [],
  };

  describe("Products tests", () => {
    xit("Endpoint POST /api/products has to create a product and add it to the db", async () => {
      const { _body } = await requester.post("/api/products").send(productMock);
      expect(_body).to.have.property("product").that.is.not.empty;
    });
  });

  describe("Products tests", () => {
    it("Endpoint GET /api/products has to get an array of products", async () => {
      const { _body } = await requester.get("/api/products").send();
      expect(_body.products).to.have.property("docs").to.be.an("array");
    });
  });

  describe("Test de carts", () => {
    const products = [
      {
        product: "63fea9bced198a34e995d081",
        quantity: 16,
      },
      {
        product: "63fea9ceed198a34e995d083",
        quantity: 1,
      },
    ];

    it("El endpoint PUT /api/cart/:cid adds products and quantities to any given cart", async () => {
      const cart = await requester.post("/api/carts");
      const id = cart._body.cart._id;
      const response = await requester.put(`/api/carts/${id}`).send(products);
      const result = response._body.cart.products.length;
      expect(result).to.be.equal(2);
    });
  });

  describe("Test de session", () => {
    it("El endpoint POST /api/auth permite el login de un usuario registrado", async () => {
      const user = {
        email: "test1@gmail.com",
        password: "1234",
      };
      const auth = await requester.post("/api/auth").send(user);
      expect(auth._body).to.have.property("user")
    });
  });
});
