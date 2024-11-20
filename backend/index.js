const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// ROUTES
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
app.use("/api/books", bookRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.MONGOURL);

  app.get("/", (req, res) => {
    res.send("THIS IS WORKING WITH NODEMON");
  });
}

main()
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("SERVER STARTED AT PORT::" + port);
});
