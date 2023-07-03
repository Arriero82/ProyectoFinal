import { Router } from "express";
import CartManager from "../dao/mongo/carts.mongo.js";
import CustomError from "../utils/errors/CustomErrors.errors.js";
import { generateCartErrorInfo } from "../utils/errors/info.error.js";
import EnumErrors from "../utils/errors/enums.errors.js";
import onlyUserAccess from "../middlewares/onlyUserAccess.middlewares.js";

const Cart = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.get();
    const response = carts.map(({ _id, products }) => ({
      id: _id,
      products,
    }));
    res.json({ response });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.getById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/:cid/purchase", async (req, res) => {
  try {
    const { cid } = req.params;
    if (cid.length !== 24) {
      CustomError.createError({
        name: "cart id error",  
        cause: generateCartErrorInfo(cid),
        message: "error finalizing cart",
        code: EnumErrors.INVALID_PARAM_ERROR,
      });
    }
    const userEmail = req.session.user.email;
    const response = await Cart.purchase(cid, userEmail);
    res.json({ response });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body.email;
    if (!user) res.json({ error: "user is not logged in" });
    let newCart;
    const cartData = {
      product: {},
      user,
    };
    const cart = await Cart.findOne({ user });
    if (!cart) {
      newCart = await Cart.create(cartData);
    }
    newCart = cart;
    req.session.user.cart = newCart;
    res.json({ newCart });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/:cid/product/:pid", onlyUserAccess, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (cid.length !== 24 || pid.length !== 24) {
      CustomError.createError({
        name: "Product add error",
        cause: generateParamErrorInfo(cid, pid),
        message: "error adding product to cart",
        code: EnumErrors.INVALID_PARAM_ERROR,
      });
    }
    await Cart.addProduct(cid, pid);
    const cart = await Cart.getById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/", async (req, res) => {
  try {
    const { id, quantity, email } = req.body;
    const product = {
        id,
        quantity,
      }
    const cart = await Cart.addProduct(email, product)
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    await Cart.updateQuantity(cid, pid, quantity);
    const cart = await Cart.getById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.deleteProductById(cid, pid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.deleteById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
