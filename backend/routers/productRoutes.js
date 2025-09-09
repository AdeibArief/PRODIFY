import express from "express";
import { 
  deleteProduct, 
  getAllProducts, 
  getProduct, 
  updateProduct, 
  createProduct 
} from "../controllers/productController.js";

const router = express.Router();

router.get('/', getAllProducts);         // GET all products
router.get('/:id', getProduct);          // GET single product by ID
router.post('/', createProduct);         // CREATE product
router.put('/:id', updateProduct);       // UPDATE product
router.delete('/:id', deleteProduct);    // DELETE product

export default router;
