// ==========================================================
//  product.js  ->  ONE page that can show ANY product
//
//  1. read the id out of the URL
//  2. find that product in the array
//  3. fill the page with its data
// ==========================================================

// ----------------------------------------------------------
// 1. READ THE ID FROM THE URL
//
//    products.html links to:   product.html?id=3
//    location.search is:       "?id=3"
//    URLSearchParams reads it like a key/value pair
// ----------------------------------------------------------
const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

// NOTE: params.get("id") always gives back a STRING ("3"),
// and our ids in products.js are NUMBERS (3).
// "3" === 3 is false, so we must convert with Number().

console.log("URL says id =", id);

// ----------------------------------------------------------
// 2. FIND THAT PRODUCT IN THE ARRAY
//    find() gives back the matching object, or undefined
// ----------------------------------------------------------
const product = products.find(function (p) {
  return p.id === id;
});

// ----------------------------------------------------------
// 3. FILL THE PAGE
// ----------------------------------------------------------
if (product) {
  showProduct(product);
} else {
  document.getElementById("notFound").classList.remove("hidden");
}

function showProduct(product) {

  // The browser tab title too, not just the page
  document.title = product.name + " - My Shop";

  document.getElementById("productEmoji").innerText = product.emoji;
  document.getElementById("productCategory").innerText = product.category;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productPrice").innerText = "$" + product.price;
  document.getElementById("productDescription").innerText = product.description;

  const stockText = document.getElementById("productStock");

  if (product.inStock) {
    stockText.innerText = "In stock";
    stockText.className = "in-stock";
  } else {
    stockText.innerText = "Out of stock";
    stockText.className = "out-stock";
  }

  document.getElementById("detail").classList.remove("hidden");

  // --------------------------------------------------------
  //  The Add to Cart button carries the SAME data-
  //  attributes as the cart project, so the cart code you
  //  already wrote can be dropped in here later.
  // --------------------------------------------------------
  const addBtn = document.getElementById("addBtn");

  addBtn.dataset.id = product.id;
  addBtn.dataset.name = product.name;
  addBtn.dataset.price = product.price;

  addBtn.addEventListener("click", function () {
    console.log("Add to cart:", product);
    // <- your cart + localStorage code goes here
  });
}
