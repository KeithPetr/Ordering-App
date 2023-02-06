import { menuArray } from "/data.js";

const menu = document.getElementById("menu");
const orderEl = document.getElementById("order");
const orderTitleEl = document.getElementById("order-title");
const totalPriceEl = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order-btn");
const closeBtn = document.getElementById("close")
let orderArray = [];
let totalPrice = [];

// this is the render function that iterates through each object in the menu array
// each object is called 'value' and dot notation can be used to access the different
// values needed from each 'value' object
// template literals are used to allow for html tags easier and allow for easy access
// to those js variables within the html

// when you click on the plus sign, an item needs to be added to the order summary
// it should then show the total and display the complete order button
// when you click on 'remove', the function checks the target element to see if
// it has that dataset. If it does, then it assigns it to a variable.

document.addEventListener("click", function (e) {
  if (e.target.dataset.added) {
    handleAddItemClick(menuArray[e.target.dataset.added]);
  } else if (e.target.dataset.remove) {
    let removedItem = e.target.dataset.remove;
    console.log(removedItem);
    let indexOfItem = orderArray.findIndex((item) => item.id == removedItem);
    console.log(indexOfItem);
    orderArray.splice(indexOfItem, 1);
    totalPrice.splice(indexOfItem, 1);
  }
  renderOrderSummary();
  priceTotal();
});

// function to push an individual item that has it's corresponding
// plus sign clicked on

function handleAddItemClick(item) {
  orderArray.push(item);
  totalPrice.push(item.price);
}

// this function loops through the menuArray and assigns each object in that array to that
// array to value. I then use dot notation to access the values at each key within
// each object and apply them as JS to the inner HTML using template literals

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

renderMenu();

function completeOrder() {
  document.getElementById("complete-order").classList.remove('hidden')
}

completeOrderBtn.addEventListener("click", completeOrder);

function closeCardDetails() {
  document.getElementById('complete-order').classList.add('hidden')
}

closeBtn.addEventListener('click', closeCardDetails)
