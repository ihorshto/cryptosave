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
async function initMySQL() {
 connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cryptosave'
 })
}
const cors = require('cors')
app.use(cors())

// les fonctions de gestion des produits en base de données
async function loadProjects(where = "1=1", orderBy = "name") {
 const [rows, fields] = await connection.query('SELECT * FROM projects WHERE id_users = 1');
 return rows;
}

async function loadInvestments(id) {

}
async function addProduct(product) {}
async function updateProduct(id, product) {}
async function removeProduct(id) {}

// les pages du site web
app.get("/investments", async function (req, res) {
 let projectsList = await loadProjects();
 console.log("projects", projectsList)
 res.render('investments.eta', {
  projectsList
 })
});

app.get("/list", async function (req, res) {});
app.get("/details/:id", async function (req, res) {});

// les requêtes REST du backoffice
app.get("/office/investments", async function (req, res) {
 let projectsList = await loadProjects();
 console.log("access", projectsList)
 res.send({
  data: projectsList
 });
});
app.get("/office/products/:id", function (req, res) {});
app.post("/office/products", function (req, res) {});
app.put("/office/products/:id", function (req, res) {});
app.delete("/office/products/:id", function (req, res) {});


app.listen(8000, async function () {
 console.log("listening on port 8000");
 await initMySQL();
});