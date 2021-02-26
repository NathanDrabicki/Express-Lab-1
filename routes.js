"use strict";
const express = require("express");
const routes = express.Router();

const cartItems = [
  { id: 1, product: "Tacos", price: 3, quantity: 2 },
  { id: 2, product: "Cereal", price: 2, quantity: 4 },
  { id: 3, product: "Bread", price: 1, quantity: 1 },
  { id: 4, product: "Candy", price: 8, quantity: 12 },
];

let nextId = 5;

routes.get("/cart-items", (req, res) => {
  let maxPrice = req.query.maxPrice;
  let prefix = req.query.prefix;
  let pageSize = req.query.pageSize;
  let filteredCartItems = cartItems;
  if (maxPrice) {
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.price <= parseInt(maxPrice);
    });
    if (prefix) {
      filteredCartItems = filteredCartItems.filter((item) => {
        return (
          item.product.toLowerCase().startsWith(prefix.toLowerCase().trim()) ===
          product
        );
      });
    }
  }
  if (pageSize) {
    filteredCartItems = filteredCartItems.slice(0, pageSize);
  } else {
    res.status(404);
  }

  res.json(filteredCartItems);
});

routes.get("/cart-items/:id", (req, res) => {
  const id = req.params.id;

  const foundItem = cartItems.find((cartItem) => cartItem.id === parseInt(id));
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404);
    res.send(`No item with id ${id} exists.`);
  }
});

routes.post("/cart-items/:id", (req, res) => {
  const cartItem = req.body;
  cartItem.id = nextId++;
  cartItems.push(cartItem);

  res.status(201);
  res.json(cartItem);
});

routes.put("/cart-items/:id", (req, res) => {
  let id = req.params.id;
  let updatedItem = req.body;
  updatedItem.id = id;
  let index = cartItems.findIndex((item) => {
    return item.id === parseInt(id);
  });
  if (index === -1) {
    res.status(404);
    res.send(`No item with id ${id} exists.`);
  } else {
    updatedItems[index] = updatedItem;
    res.json(updatedItem);
  }
});

routes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((cartItem) => cartItem.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.status(204);
});

module.exports = routes;
