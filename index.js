import { menuArray } from "/data.js"

const menu = document.getElementById("menu")

// this is the render function that iterates through each object in the menu array
// each object is called 'value' and dot notation can be used to access the different
// values needed from each 'value' object
// template literals are used to allow for html tags easier and allow for easy access
// to those js variables within the html

function renderMenu() {
    let menuString = ''
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
            <img src="images/plus-circle.svg" class="plus-circle" alt="add item symbol">
        </div>
        `
    }
    menu.innerHTML = menuString
}

renderMenu()