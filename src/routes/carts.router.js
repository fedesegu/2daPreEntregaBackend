import { Router } from "express";
import { cartsManager } from "../manager/cartsManager.js"

const router = Router();
const cartsManager = new cartsManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.findAllCart()
    res.status(200).json({ message: "carts total", carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsManager.findCartById(idCart);
    res.status(200).json({ message: "cart by id", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
  const cart = await cartsManager.createCart();
  res.json({ cart });} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const addedProduct = await cartsManager.addProductToCart(idCart, idProduct);
    res.status(200).json({ message: "Added Product", product: addedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const response = await cartsManager.deleteTotalProductToCart(idCart);
    if (!response) {
      return res.status(404).json({ message: "cart not found" });
    }
    res.status(200).json({ message: "product delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const response = await cartsManager.deleteProductToCart(idCart, idProduct);
    if (!response) {
      return res.status(404).json({ message: "product not founded" });
    }
    res.status(200).json({ message: "User update IN CADR" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const { quantity } = req.body;
  try {
    const response = await cartsManager.addProductToCartQuantity(idCart, idProduct, quantity);
    if (!response) {
      return res.status(404).json({ message: "cart not found" });
    }
    res.status(200).json({ message: "quantity update in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const { newProducts } = req.body;
  console.log(newProducts);
  try {
    const response = await cartsManager.updateCart(idCart, newProducts);
    if (!response) {
      return res.status(404).json({ message: "cart not founded" });
    }
    res.status(200).json({ message: "product update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;