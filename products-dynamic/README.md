# Dynamic product list + one product page

Two pages, one shared array of objects, no framework and no server.

```
products.js     ->  the "database": an array of 6 product objects
products.html   ->  the LIST page. Empty <div>, JS fills it.
list.js         ->  loops the array, builds one card per product
product.html    ->  the DETAIL page. One page for ALL products.
product.js      ->  reads ?id= from the URL, finds that product, fills the page
```

**This project works by double-clicking the HTML files.** No Live Server needed,
because these are plain `<script src>` tags, not ES modules. (The Firebase
projects do need a server.)

## The idea

`product.html` is **one file**, and it can show any of the 6 products.
Nothing is copied per product. The URL decides what to show:

```
product.html?id=1   ->  T-Shirt
product.html?id=3   ->  Headphones
product.html?id=99  ->  "Product not found"
product.html        ->  "Product not found"  (no id at all)
```

Three lines in `product.js` do all the work:

```js
const params = new URLSearchParams(location.search);  // "?id=3"
const id = Number(params.get("id"));                  // 3
const product = products.find(p => p.id === id);      // the object
```

Then it writes the values into the elements that are already in the HTML
(`#productName`, `#productPrice`, ...). The HTML is the empty template, the
array is the data, and the JS glues them together. That is the whole pattern
behind every shop, blog and dashboard your students will ever build.

## The gotcha worth teaching out loud

`params.get("id")` returns the **string** `"3"`, not the number `3`.
Our ids in `products.js` are **numbers**, so `"3" === 3` is `false` and `find()`
returns `undefined`. Wrapping it in `Number()` fixes it. Students who skip this
get a "Product not found" page and no idea why, so it is a good one to let them
hit once on purpose.

## Where this connects to the cart project

The card in `list.js` uses `${product.name}` and `${product.price}` — the same
fields as the cart's `data-` attributes. And the detail page's Add to Cart
button gets `data-id`, `data-name`, `data-price` set from the object, so the
cart code from the previous lesson can be dropped straight into `product.js`.

## Try in class

- Open `product.html?id=3` directly by typing it in the address bar
- Change the `1` in the URL to a `5` and hit enter, same page, new product
- Open `product.html?id=99` to see the not-found branch
- Add a 7th product to `products.js` — it appears in the list with no HTML changes
- Delete a product from the array and watch its page become "not found"
