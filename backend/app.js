const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const {
  pool,
  checkProductsTable,
  createProductsTable,
  checkAdminsTable,
  createAdminsTable,
  addAdmin,
} = require("./utils/database");
require("dotenv").config();
const routes = require("./routes/routes");
const { storage, fileFilter } = require("./utils/file-storage");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(multer({ storage, fileFilter }).single("image"));
app.use("/api", routes);

pool.connect(async (err, client, done) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the application if database connection fails
  } else {
    console.log("Connected to database");
    const productTableExists = await checkProductsTable();
    const adminsTableExists = await checkAdminsTable();

    if (!productTableExists) {
      await createProductsTable();
    }
    if (!adminsTableExists) {
      await createAdminsTable();
      await addAdmin("admin", "admin");
    }
    done();
    startServer(); // Start the server if database connection is successful
  }
});

function startServer() {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}
