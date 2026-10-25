// ****** SELECT ITEMS **********

const alertMessage = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option

let editElement;
let editFlag = false;
let editID = "";


// ****** EVENT LISTENERS **********

form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);


// ****** FUNCTIONS **********

function addItem(event) {
    event.preventDefault();

    const value = grocery.value.trim();

    if (value !== "" && editFlag === false) {

        const id = Date.now().toString();

        createListItem(id, value);

        displayAlert("Продукт додано", "success");

        addToLocalStorage(id, value);

        grocery.value = "";

    } else if (value !== "" && editFlag === true) {

        editElement.textContent = value;

        editLocalStorage(editID, value);

        displayAlert("Продукт змінено", "success");

        setBackToDefault();

    } else {

        displayAlert("Введіть назву продукту", "danger");
    }
}


function createListItem(id, value) {

    const article = document.createElement("article");

    article.classList.add("grocery-item");

    article.setAttribute("data-id", id);


    const title = document.createElement("p");

    title.classList.add("title");

    title.textContent = value;


    const btnContainer = document.createElement("div");

    btnContainer.classList.add("btn-container");


    const editBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");

    editBtn.innerHTML = '<i class="fas fa-edit"></i>';

    editBtn.addEventListener("click", editItem);


    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    deleteBtn.addEventListener("click", deleteItem);


    btnContainer.append(editBtn, deleteBtn);

    article.append(title, btnContainer);

    list.append(article);

    container.classList.add("show-container");
}


function deleteItem(event) {

    const element = event.currentTarget.parentElement.parentElement;

    const id = element.dataset.id;

    list.removeChild(element);

    removeFromLocalStorage(id);

    displayAlert("Продукт видалено", "danger");

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }

    setBackToDefault();
}


function editItem(event) {

    const element = event.currentTarget.parentElement.parentElement;

    editElement = element.querySelector(".title");

    grocery.value = editElement.textContent;

    editFlag = true;

    editID = element.dataset.id;

    submitBtn.textContent = "Редагувати";
}


function clearItems() {

    const items = document.querySelectorAll(".grocery-item");

    for (let item of items) {
        list.removeChild(item);
    }

    container.classList.remove("show-container");

    displayAlert("Список очищено", "danger");

    localStorage.removeItem("list");

    setBackToDefault();
}


function displayAlert(text, action) {

    alertMessage.textContent = text;

    alertMessage.classList.add(`alert-${action}`);

    setTimeout(function () {

        alertMessage.textContent = "";

        alertMessage.classList.remove(`alert-${action}`);

    }, 1500);
}


function setBackToDefault() {

    grocery.value = "";

    editFlag = false;

    editID = "";

    submitBtn.textContent = "Додати";
}


// ****** LOCAL STORAGE **********

function getLocalStorage() {

    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}


function addToLocalStorage(id, value) {

    const groceryList = getLocalStorage();

    groceryList.push({
        id: id,
        value: value
    });

    localStorage.setItem("list", JSON.stringify(groceryList));
}


function removeFromLocalStorage(id) {

    let groceryList = getLocalStorage();

    groceryList = groceryList.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem("list", JSON.stringify(groceryList));
}


function editLocalStorage(id, value) {

    let groceryList = getLocalStorage();

    groceryList = groceryList.map(function (item) {

        if (item.id === id) {
            item.value = value;
        }

        return item;
    });

    localStorage.setItem("list", JSON.stringify(groceryList));
}


// ****** SETUP ITEMS **********

function setupItems() {

    const groceryList = getLocalStorage();

    if (groceryList.length > 0) {

        for (let item of groceryList) {
            createListItem(item.id, item.value);
        }
    }
}