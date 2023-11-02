import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/users.router.js";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import messageRouter from "./routes/messages.router.js";

// DB
import "./db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Configura express-handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/chat", messageRouter);
app.use("/", viewsRouter);

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});