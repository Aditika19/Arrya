const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");
const authController = require("../controllers/auth");

router.get("/", (req, res) => {
  res.send("Hello, this is the root route for api!");
});

router.post("/auth/login", authController.login);

router.post("/products", productController.addProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);
router.get("/products/images/:filename", productController.getImage);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
