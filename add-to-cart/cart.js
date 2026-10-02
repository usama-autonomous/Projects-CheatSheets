// ===================================================
//  cart.js  ->  write the Add to Cart logic here
// ===================================================
//
//  NOTE: cart.html has 2 sample rows in #cart-items so
//  the design is visible in the browser. Your render
//  function should start with:
//
//      cartItems.innerHTML = ""
//
//  and they will be replaced by the real items.
//
// ---------------------------------------------------
//  HTML hooks you can use:
//
//    .add-btn          every "Add to Cart" button
//                      .dataset.id / .dataset.name / .dataset.price
//
//    #cart-items       the <ul> where cart items go
//
//      inside each row:
//        .item-name    product name
//        .item-qty     how many (the number between the buttons)
//        .qty-btn.plus  increase quantity by 1
//        .qty-btn.minus decrease quantity by 1
//        .item-total   quantity x price  (the row's total)
//        .remove-btn   delete the whole row
//
//    #empty-cart       "Your cart is empty." message (show/hide)
//    #cart-count       number in the top bar (total quantity)
//    #cart-total       number after the $ sign (digits only, e.g. 45)
//    #clear-cart       "Clear Cart" button
//
// ---------------------------------------------------
//  GOTCHA: you build the rows in JS, so the buttons in
//  the rows do not exist yet when the page loads.
//  Attach their click listeners right after you create
//  each row, not once at the top of the file.
//
// ---------------------------------------------------
//  localStorage key idea: "cart"
//
//  A cart item in localStorage could look like:
//    { id: 1, name: "T-Shirt", price: 10, qty: 2 }
//
//  Row total   = price * qty
//  Cart total  = add up every row total
//  Cart count  = add up every qty
//
