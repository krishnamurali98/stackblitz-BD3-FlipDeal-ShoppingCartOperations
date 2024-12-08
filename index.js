const express = require('express');
let cors = require('cors');

const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
// ------------
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
function addToCart(cart, productId, name, price, quantity) {
  let cartObj = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(cartObj);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let results = addToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: results });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let product = cart.find((item) => item.productId === productId);
  if (product) {
    product.quantity = quantity;
  }
  res.json({ cartItems: cart });
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter((item) => item.productId !== productId);
  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = 0;
  for (let obj of cart) {
    totalQuantity += obj.quantity;
  }
  res.json({ totalQuantity: totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = 0;
  for (let item of cart) {
    totalPrice += item.price * item.quantity;
  }
  res.json({ totalPrice: totalPrice });
});

// ------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
