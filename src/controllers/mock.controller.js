import { Router } from "express";
import generateMockproducts from "../utils/mock.utils.js";  

const router = Router();

router.get("/", (req, res) => {
  try {
    if(Object.entries(req.query).length === 0 ) req.logger.info('La request no trajo queries')
    const products = [];
    for (let i = 0; i < 100; i++) {
      let product = generateMockproducts();
      products.push(product);
    }
    res.json({ products });
  } catch (error) {
    throw error
  }
});

export default router;
