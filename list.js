// All the routes for Shopping lists

const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items = require("./fakeDb");
const Item = require("./item");

// Display all the items in shopping list
router.get("/", (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (e) {
    return next(e);
  }
});

// Add new item to shopping list
router.post("/", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

//Get item by its name from shopping list
router.get("/:query", (req, res) => {
  try {
    if (req.params.name) {
      let foundItem = Item.findByName(req.params.name);
    } else {
      let foundItem = Item.findByPrice(req.params.price);
    }
    return res.json({ item: foundItem });
  } catch (e) {
    return next(e);
  }
});

// Modify single item by or price from shopping list
router.patch("/:query", (req, res) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

// Delete a specific item from shopping list
router.delete("/:name", (req, res) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
