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
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

//Get item by its name from shopping list
router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

// Modify single item by name from shopping list
router.patch("/:name", (req, res, next) => {
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
