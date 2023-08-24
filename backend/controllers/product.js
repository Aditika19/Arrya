const { pool } = require("../utils/database");
const path = require("path");

exports.addProduct = (req, res) => {
  console.log(req.body);
  const { name, category, price, status, description } = req.body;
  const image = req.file?.filename;

  const parsedStatus = JSON.parse(status);

  if (!image) {
    res.status(422).json({
      errorMessage: "Attached file is not an image",
    });
  } else {
    const query =
      "INSERT INTO products (name, category, price, status, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [name, category, price, parsedStatus, description, image];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const newProduct = results.rows[0];
        res.status(201).json(newProduct);
      }
    });
  }
};

exports.getProducts = async (req, res) => {
  const query = "SELECT * FROM products";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results.rows);
    }
  });
};

exports.getProduct = (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM products WHERE id = $1";

  pool.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error retrieving product:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(results.rows[0]);
    }
  });
};

exports.getImage = (req, res) => {
  const fileName = req.params.filename;

  const imagePath = path.resolve(__dirname, "..", "uploads", fileName);

  res.sendFile(imagePath, (error) => {
    if (error) {
      console.error("Error retrieving image:", error);
      res.status(404).json({ error: "Image not found" });
    }
  });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, category, price, status, description } = req.body;
  const image = req.file?.filename;
  const parsedStatus = JSON.parse(status);

  const query = image
    ? "UPDATE products SET name = $1, category = $2, price = $3, status = $4, description = $5, image = $6 WHERE id = $7 RETURNING *"
    : "UPDATE products SET name = $1, category = $2, price = $3, status = $4, description = $5 WHERE id = $6 RETURNING *";

  const values = image
    ? [name, category, price, parsedStatus, description, image, productId]
    : [name, category, price, parsedStatus, description, productId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(results.rows[0]);
    }
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const query = "DELETE FROM products WHERE id = $1 RETURNING *";

  pool.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(results.rows[0]);
    }
  });
};
