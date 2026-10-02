// ==========================================================
//  list.js  ->  build one card per product
//
//  This page has NO product cards written in the HTML.
//  Every card you see was created here, from the array.
// ==========================================================

const grid = document.getElementById("product-grid");
const countText = document.getElementById("count");

countText.innerText = products.length + " products";

// Go through the array one object at a time,
// and make a card for each one.
products.forEach(function (product) {

  // 1. Create an <a> so the whole card is clickable.
  const card = document.createElement("a");
  card.className = "card";

  // 2. Send it to the detail page, and put the id in the URL.
  //    This is the important line:
  card.href = "product.html?id=" + product.id;

  // 3. Fill the card with the product's data
  card.innerHTML = `
    <div class="emoji">${product.emoji}</div>
    <h3>${product.name}</h3>
    <p class="price">$${product.price}</p>
    <span class="view">View details</span>
  `;

  // 4. Put it on the page
  grid.appendChild(card);
});
