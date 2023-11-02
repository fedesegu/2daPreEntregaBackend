import { Router } from "express";
import { ProductManager } from "../manager/productsManager.js";
import { CartManager } from "../manager/cartsManager.js";

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  let products = await productManager.getProduct();
  res.render("home", {
    products: products,
  });
});
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});


router.get("/chat", async (req, res) => {
  res.render("chat");
});

router.get("/products", async (req, res) => {
  let products = await productManager.findAll(req.query)
  let productsDB = products.payload
  const productsObject = productsDB.map(p => p.toObject());
  res.render("products", { productsData: productsObject});
});

router.get("/carts/:cartId", async (req, res) => {
  const {cartId} = req.params
  let cartById = await cartManager.findCartById(cartId);
  let cartArray = cartById.products;
  const cartArrayObject = cartArray.map(doc => doc.toObject());
  console.log(cartArrayObject);
  res.render("cart", { cartData: cartArrayObject});
});

export default router;