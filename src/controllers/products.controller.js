import { Router } from "express";
import ProductManager from "../dao/mongo/products.mongo.js";
import { privateAccess } from "../middlewares/index.js";
import CustomError from "../utils/errors/CustomErrors.errors.js";
import { generateProductErrorInfo } from "../utils/errors/info.error.js";
import EnumProductErrors from "../utils/errors/enums.errors.js";
const Product = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await Product.get(limit, page, query, sort);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.getById(pid);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    const { user } = req.session;

    if (!title || !code || !price) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo({ title, code, price }),
        message: "error creating product",
        code: EnumProductErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };

    if (user) {
      user.role === "premium"
        ? (product.owner = user.email)
        : (product.owner = "admin");
    }

    await Product.save(product);
    res.json({ status: 201, message: `product has been saved`, product });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    await Product.update(pid, product);
    res.json({ message: `product has been updated`, product });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { user } = req.session;
    const product = await Product.getById(pid);
    if (!user) {
      res.json({ message: "you need to be logged in to delete a product" });
    }
    if (user.email === product.owner || user.role === "admin") {
      await Product.deleteById(pid);
      res.json({ message: `product with Id ${pid} has been deleted` });
    } else{
      res.json({ message: `you don't have credentials to delete this product` });
    }
  } catch (error) {
    res.json({ error });
  }
});

router.post("/populate/", async (req, res) => {
  try {
    await Product.populate();
    res.json({ message: "products have been uploaded" });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/despopulate", async (req, res) => {
  try {
    await Product.despopulate();
    res.json({ message: `products have been eliminated` });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
