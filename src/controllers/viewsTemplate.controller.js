import { Router } from "express";
import { publicAccess, privateAccess } from "../middlewares/index.js";
import ProductManager from "../dao/mongo/products.mongo.js";
import UserManager from "../dao/mongo/users.mongo.js";
import CartManager from "../dao/mongo/carts.mongo.js";
import TicketManager from "../dao/mongo/tickets.mongo.js";
import adminAccess from "../middlewares/adminAccess.middleware.js";

const Product = new ProductManager();
const User = new UserManager();
const Cart = new CartManager();
const Ticket = new TicketManager();

const router = Router();

router.get("/profile", privateAccess, (req, res) => {
  const { user } = req.session;
  let isAdmin
  if(user.role==='admin'){
    isAdmin=true
  }
  res.render("profile", { user });
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/signup", publicAccess, (req, res) => {
  res.render("signup");
});

router.get("/forgotPass", (req, res) => {
  res.render("forgotPass");
});

router.get("/passrecovery", (req, res) => {
  res.render("passrecovery");
});

router.get("/", (req, res) => {
  const { user } = req.session;
  let isAdmin
  if(user.role==='admin'){
    isAdmin=true
  }
  res.render("home", { user, isAdmin });
});

router.get("/users", adminAccess, async (req, res) => {
  const { user } = req.session;

  const users = await User.get();
  const docs = [];
  users.forEach((element) => {
    const { name, lastname, email, role } = element;
    docs.push({ name, lastname, email, role });
  });
  res.render("users", { docs });
});

router.get("/products", privateAccess, async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const { user } = req.session;
    const products = await Product.get(limit, page, query, sort);
    const docs = [];
    products.docs.forEach((element) => {
      const { _id, title, description, price, stock } = element;
      docs.push({ id: _id, title, description, price, stock });
    });
    res.render("products", { user, products, docs });
  } catch (error) {
    console.log(error);
    res.render("products", { error });
  }
});

router.get("/cart", privateAccess, async (req, res) => {
  try {
    let quantity;
    const { user } = req.session;
    const cart = await Cart.findOne({ user: user.email });
    const cid = cart._id.toString();

    const formattedProducts = cart.products.map((item) => {
      const { id, title, description, price } = item.product;
      const { quantity } = item;
      const total = price * quantity;

      return {
        cid,
        id,
        title,
        description,
        price,
        quantity,
        total,
      };
    });
    const totalPrice = formattedProducts.reduce(
      (sum, item) => sum + item.total,
      0
    );

    res.render("cart", { user, formattedProducts, totalPrice, cid });
  } catch (error) {
    res.render("cart", { error });
  }
});

router.get("/ticket", privateAccess, async (req, res) => {
  try {
    const { user } = req.session;
    const userEmail = user.email;

    const ticket = await Ticket.findLastOne(userEmail);
    console.log(ticket);
    const { code, purchase_datetime, ammount, purchaser } = ticket;
    const purchaseDateISO = purchase_datetime;
    const purchaseDate = new Date(purchaseDateISO);

    const formattedDate = purchaseDate.toLocaleDateString(); // Obtiene la fecha en formato legible (por ejemplo, '02/07/2023')
    const formattedTime = purchaseDate.toLocaleTimeString();

    const renderTicket = {
      code,
      purchase_datetime: `${formattedDate} ${formattedTime}`,
      ammount,
      purchaser,
    };
    console.log(renderTicket);
    res.render("ticket", { user, renderTicket });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
