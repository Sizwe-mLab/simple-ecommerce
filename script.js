/*
    Document Object Model(DOM)
     - When a browser laods an HTML document, it converts the html document into a document object.
     - In the context of the DOM, the root node refers to the top-most node of the document tree.
     - For the html document, this root node is the <html> element. It servers as the parent for all the other nodes
*/

/*
    CSS selectors are used to find pr select the html element you want to style.
        * simple selectors - selects elements based on name, id and class
        * attribute selectors - selects elements based on an attribute or attribute value
    - getElementById method returns an element with a specified value
        * can also be used to read or edit elements
    - querySelectorAll method returns all elements as selected
        * returns in a form of NodeList, which is an array-like collection of Node Objects
        * NodeList and Arrays
            NodeList: NodeList provide a language independent way to access DOM elements
            Arrays: JavaScript objects used to store a collection of items.
    - addEventListener method attches an event handler to a document. Allows us to define whay should happen
        when a certain event occurs on that element
*/

let cart = [];

const cartCountElement = document.getElementById("cart-count");
const cartItemsElemnt = document.getElementById("cart-items");

document.querySelectorAll(".add-to-cart").forEach((button) => {
  // forEach and for
  // cleaner, best way loop through an array doing the same thing to each item which skipping or breaking
  // for, stop loop early, await (asynchoronous), add complex logic
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    // console.log(productCard, 'product card');
    const productId = productCard.getAttribute("data-id");
    // console.log(productId, 'productId');
    const productName = productCard.querySelector("h3").innerText;
    const productPrice = productCard.querySelector("p").innerText;
    let product = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    };
    addToCart(product);
  });
});

function addToCart(product) {
  // console.log(product, 'added to cart');
  const cartItem = cart.find((item) => item.id === product.id); // checking to see if item already exists in the cart
  // purpose of this is to avoid product duplicates, instead increase quantity
  if (cartItem) {
    cartItem.quantity++;
    // console.log(cartItem, 'cartItem');
  } else {
    console.log("cartItem undefined because product does not exist in cart");
    cart.push(product); // if the product does not already exist in the cart, then add that product to cart
    // console.log(cart, 'product added to cart');
  }
  updateCart();
}

function updateCart() {
  cartCountElement.innerText = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );
  if (cart.length === 0) {
    cartItemsElemnt.innerHTML = "<p>No items in the cart</p>";
  } else {
    cartItemsElemnt.innerHTML = "";
    cart.forEach((product) => {
      const newCartItem = document.createElement("div");
      newCartItem.classList.add("cart-item");
      newCartItem.innerHTML = `<span>${product.name} (${product.quantity}) - ${product.price}</span>
        <button class="remove-from-cart" data-id=${product.id}>Remove</button>
      `;
      cartItemsElemnt.appendChild(newCartItem)
    });
    document.querySelectorAll(".remove-from-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id")
            removeItem(productId)
        })
    })
  }
}

function removeItem(productId){
    cart = cart.filter((product) => product.id !== productId)
    updateCart()
}