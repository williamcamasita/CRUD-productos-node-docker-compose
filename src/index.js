


const express = require("express");
const path = require("path");
const router = require("./router/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(3000, function () {
  console.log("Servidor iniciado en http://localhost:3000");
});
