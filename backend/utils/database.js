const { Pool } = require("pg");
const { hash } = require("bcrypt");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const checkProductsTable = () => {
  const query = `SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'products'
  )`;

  return pool
    .query(query)
    .then((result) => result.rows[0].exists)
    .catch((error) => {
      console.error("Error checking products table:", error);
      return false;
    });
};

const createProductsTable = () => {
  const query = `CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    image VARCHAR(255) NOT NULL
  )`;

  return pool
    .query(query)
    .then(() => console.log("Products table created successfully"))
    .catch((error) => console.error("Error creating products table:", error));
};

const checkAdminsTable = () => {
  const query = `SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'admins'
  )`;

  return pool
    .query(query)
    .then((result) => result.rows[0].exists)
    .catch((error) => {
      console.error("Error checking admins table:", error);
      return false;
    });
};

const createAdminsTable = () => {
  const query = `CREATE TABLE admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`;

  return pool
    .query(query)
    .then(() => console.log("Admins table created successfully"))
    .catch((error) => console.error("Error creating admins table:", error));
};

const addAdmin = async (username, password) => {
  try {
    const hashedPassword = await hash(password, 10);

    await pool.query(
      "INSERT INTO admins (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    console.log("Admin added successfully");
  } catch (error) {
    console.error("Error adding admin:", error);
  }
};

module.exports = {
  pool,
  checkProductsTable,
  createProductsTable,
  checkAdminsTable,
  createAdminsTable,
  addAdmin,
};
