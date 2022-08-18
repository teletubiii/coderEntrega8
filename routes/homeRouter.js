const express = require("express");
const { Router } = require("express");
const home = Router();


const Contenedor = require("../controller/products.controller")

home.get("/", (req, res) => {  
  res.render('home'); 
});



module.exports = home;