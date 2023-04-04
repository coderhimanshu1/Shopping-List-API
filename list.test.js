process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");
// app imports
const app = require("./app");

let items = require("./fakeDb");

let item = { name: "table", price: 1200 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});
// end afterEach

// Tests for Get items

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

// Tests for get item by name

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

// Tests for creating new item

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const response = await request(app).post(`/items`).send({
      name: "Nori",
      price: 1.2,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Nori");
    expect(response.body.item.price).toEqual(1.2);
  });
});

// Tests for modifying a item

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app).patch(`/items/${item.name}`).send({
      name: "Chair",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "Chair",
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

// Tests for deleting a item

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
