// ==========================================================
//  products.js  ->  our tiny "database"
//
//  This is just an array of objects. No Firebase, no server.
//  BOTH pages load this file, so the data lives in one place.
//
//  The shape matches the cart project:
//    { id, name, price, ... }
// ==========================================================

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 10,
    emoji: "👕",
    category: "Clothing",
    inStock: true,
    description: "A soft cotton t-shirt for everyday use. Unisex fit, available in several colours."
  },
  {
    id: 2,
    name: "Shoes",
    price: 25,
    emoji: "👟",
    category: "Footwear",
    inStock: true,
    description: "Light running shoes with a rubber sole. Comfortable enough to wear all day."
  },
  {
    id: 3,
    name: "Headphones",
    price: 15,
    emoji: "🎧",
    category: "Audio",
    inStock: true,
    description: "Over-ear headphones with a built-in microphone. Folds flat for travel."
  },
  {
    id: 4,
    name: "Watch",
    price: 20,
    emoji: "⌚",
    category: "Accessories",
    inStock: false,
    description: "A simple everyday watch with a water resistant case and a leather strap."
  },
  {
    id: 5,
    name: "Backpack",
    price: 30,
    emoji: "🎒",
    category: "Bags",
    inStock: true,
    description: "A 20 litre backpack with a laptop sleeve and two side pockets for bottles."
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 12,
    emoji: "🕶️",
    category: "Accessories",
    inStock: true,
    description: "UV400 sunglasses with a lightweight frame. Comes with a hard case."
  }
];
