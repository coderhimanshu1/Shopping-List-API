/** Item in a shopping cart. */
const ExpressError = require("./expressError");
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    items.push(this);
  }

  static findAll() {
    return items;
  }
  /** Update found item with matching name to data. */

  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw { message: "Item Not Found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  /** Find item and return with matching name. */

  static find(name) {
    const foundItem = items.find((item) => item.name === name);
    if (foundItem === undefined) {
      throw new ExpressError("Item Not Found", 404);
    }
    return foundItem;
  }

  static remove(name) {
    let foundIdx = items.findIndex((item) => item.name === name);
    if (foundIdx === -1) {
      throw new ExpressError("Item Not Found", 404);
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;
