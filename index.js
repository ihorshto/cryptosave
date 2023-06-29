const fs = require("fs");
const express = require("express");
const app = express();
const eta = require("eta");
const bodyParser = require('body-parser');
const dayjs = require('dayjs')
const mysql = require('mysql2/promise');

app.engine("eta", eta.renderFile);
eta.configure({
 views: "./views",
 cache: false
});
app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
 extended: true
}))
app.use(bodyParser.json())

let connection;
async function initMySQL() {}

// les fonctions de gestion des produits en base de données
async function loadProducts(where = "1=1", orderBy = "name") {}
async function loadProduct(id) {}
async function addProduct(product) {}
async function updateProduct(id, product) {}
async function removeProduct(id) {}

// les pages du site web
app.get("/", function (req, res) {
 res.redirect("/list");
});
app.get("/list", async function (req, res) {});
app.get("/details/:id", async function (req, res) {});

// les requêtes REST du backoffice
app.get("/office/products", function (req, res) {});
app.get("/office/products/:id", function (req, res) {});
app.post("/office/products", function (req, res) {});
app.put("/office/products/:id", function (req, res) {});
app.delete("/office/products/:id", function (req, res) {});


app.listen(8000, async function () {
 console.log("listening on port 8000");
 await initMySQL();
});