import { menuArray } from "/data.js";

// section for all the DOM elemenets and the arrays

const menu = document.getElementById("menu");
const orderEl = document.getElementById("order");
const orderTitleEl = document.getElementById("order-title");
const totalPriceEl = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order-btn");
const closeBtn = document.getElementById("close");
const creditCardForm = document.getElementById("credit-card-form")
let orderArray = [];
let totalPrice = [];

// the below variable changes to false when the 'complete order' button is
// clicked so that items can't be added or removed when the card details
// are being entered. It switches back to true when the 'X' is clicked to
// close the card details so that the order can be updated

let enabled = true; 



// when you click on the plus sign, the handleAddItemClick function runs. the 
// parameter for the function is the object associated with the value from the
// 'added' dataset. when you click on 'remove', the 'else if' section 
// checks the target element to see if it has the 'remove' dataset. If it does,
// then it assigns it to a variable. this variable is used to compare to the 
// item.id of each menu item in the orderArray using .findIndex. if there is
// a match, that item and it's price are removed from the arrays.

document.addEventListener("click", function (e) {
  if (e.target.dataset.added) {
    handleAddItemClick(menuArray[e.target.dataset.added]);
  } else if (enabled === true && e.target.dataset.remove) {
    let removedItem = e.target.dataset.remove;
    let indexOfItem = orderArray.findIndex((item) => item.id == removedItem);
    orderArray.splice(indexOfItem, 1);
    totalPrice.splice(indexOfItem, 1);
  }
  renderOrderSummary();
  priceTotal();
});

// The below function pushes an individual menu item to the orderArray 
// that has it's corresponding plus sign clicked on. It also pushes that
// corresponding menu item's price to the totalPrice array

function handleAddItemClick(item) {
  if (enabled === true) {
    orderArray.push(item);
    totalPrice.push(item.price);
  }
}

// below is the render function that iterates through each object in the menu array
// each object is called 'value' and dot notation can be used to access the different
// values needed from each 'value' object
// template literals are used to allow for html tags easier and allow for easy access
// to those js variables within the html
// the innerHTML is added to the menu div in the HTML file

function renderMenu() {
  let menuString = "";
  for (let value of menuArray) {
    menuString += `
        <div class="item-section" id="item-section">
            <div class="item">
                <div class="emoji" id="emoji">${value.emoji}</div>
                <div class="description">
                    <div class="item-name">${value.name}</div>
                    <div class="ingredients">${value.ingredients}</div>
                    <div class="price">$${value.price}</div>
                </div>
            </div>
            <img 
            src="images/plus-circle.svg" id="plus-circle" class="plus-circle" 
            alt="add item symbol" data-added="${value.id}">
        </div>
        `;
  }
  menu.innerHTML = menuString;
}

renderMenu();

// The below function allows for the order summary at the bottom of the app
// to display once the plus sign has been clicked. It also removes the hidden
// class from the entire order element, the 'Your Order' p tag, and the 
// 'Complete Order' green button so that they become visible.

function renderOrderSummary() {
  let orderString = "";
  orderEl.classList.remove("hidden");
  orderTitleEl.classList.remove("hidden");
  completeOrderBtn.classList.remove("hidden");
  for (let item of orderArray) {
    orderString += `
            <div id="order-item-section" class="order-item-section">
                <div class="order-item">
                    <div class="order-name">${item.name}</div>
                    <div class="remove-btn" data-remove="${item.id}">remove</div>
                </div>
                <div class="order-price">$${item.price}</div>
            </div>
        `;
  }
  orderEl.innerHTML = orderString;
}

// the below function iterates over the totalPrice array to sum up the prices
// of all the items that have been added to the order summary.

function priceTotal() {
  let priceString = "";
  let total = totalPrice.reduce((a, b) => a + b, 0);
  priceString = `
    <div class="total-price-section">
          <div class="total-price-title">Total Price:</div>
          <div class="total-price-amount">$${total}</div>
    </div>
    `;
  totalPriceEl.innerHTML = priceString;
}

// the below function and eventlistener checks if there is anything in the
// orderArray to render to the order summary. If the array is empty, the complete
// order button will not work. Reduces opacity so background looks greyed out by
// adding the 'opacity' class

function completeOrder() {
  if (orderArray.length >= 1) {
    enabled = false;
    document.getElementById("complete-order").classList.remove("hidden");
    document.getElementById("menu").classList.add('opacity')
    document.getElementById("order").classList.add('opacity')
    document.getElementById("total-price").classList.add('opacity')
    document.getElementById("complete-order-btn").classList.add('opacity')
    document.getElementById("order-title").classList.add('opacity')
  }
}

completeOrderBtn.addEventListener("click", completeOrder);

// the below function and eventlistener adds the 'display: none' CSS to the
// card details modal when the 'X' is clicked on. This removes the modal so
// the user can continue adding or removing menu items. Also removes the opacity
// class.

function closeCardDetails() {
  enabled = true;
  document.getElementById("complete-order").classList.add("hidden");
  document.getElementById("menu").classList.remove('opacity')
  document.getElementById("order").classList.remove('opacity')
  document.getElementById("total-price").classList.remove('opacity')
  document.getElementById("complete-order-btn").classList.remove('opacity')
  document.getElementById("order-title").classList.remove('opacity')
}

closeBtn.addEventListener("click", closeCardDetails);

// the below function listens for a 'submit' from the 'pay' button. It then
// adds the .hidden class to remove all of the order details and adds the
// delivery status message to the innnerHTML of the order div

creditCardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById('complete-order').classList.add('hidden')
  completeOrderBtn.classList.add("hidden")
  orderTitleEl.innerHTML = ''
  totalPriceEl.innerHTML = ''
  orderEl.innerHTML = `
    <div id="delivery-status" class="delivery-status">
      <p id="delivery-message" class="delivery-message">
      Thanks ${document.getElementById("name").value}! Your food is on it's way!
      </p>
    </div>
  `;
});

// the below function removes the opacity class when the 'pay' button is
// clicked

document.getElementById('pay-btn').addEventListener('click', function() {
  document.getElementById("menu").classList.remove('opacity')
  document.getElementById("order").classList.remove('opacity')
  document.getElementById("total-price").classList.remove('opacity')
  document.getElementById("complete-order-btn").classList.remove('opacity')
  document.getElementById("order-title").classList.remove('opacity')
})