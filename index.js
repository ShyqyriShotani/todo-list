let inputItem = document.getElementById("item-input");
console.log(inputItem);

let addButton = document.getElementById("addItemBtnId");
console.log(addButton);

let itemList = document.getElementById("item-list");
console.log(itemList);

let itemForm = document.getElementById("item-form");
console.log(itemForm);

let clearAll = document.getElementById("clear");

let numberOfItems = 0;

let filterItemBtn = document.getElementById("filter");
console.log("filterItemBtn");

let isEditMode = false;

function displayItemFromStorage() {
  let itemFromStorage = getItemsFromStorage();
  itemFromStorage.forEach((item) => {
    createItem(item);
  });
}

function createItem(text) {
  let li = document.createElement("li");
  console.log(li);
  let textItem = document.createTextNode(text);
  console.log(textItem);
  li.appendChild(textItem);
  let button = document.createElement("button");
  let icon = document.createElement("i");
  li.appendChild(button);
  button.classList = "remove-item btn-link text-red";
  icon.classList = "fa-solid fa-x";
  itemList.appendChild(li);
  button.appendChild(icon);
}

//  if (numberOfItems === 0) {
//    clearAll.style.display = "none";
//    filterItemBtn.style.display = "none";
//  } else {
//    clearAll.style.display = "block";
//    filterItemBtn.style.display = "block";
 
// }
 
if (inputItem.length > 1) {
  inputItem.style.color = "red";
} else {
  inputItem.style.color = "green";
}
function addItem(e) {
  e.preventDefault();
  let newText = inputItem.value;
  createItem(newText);
  inputItem.value = "";
  clearAll.style.display = "block";
  filterItemBtn.style.display = "block";
  inputItem.style.color = "red";
  addItemsToStorage(newText);
}
function filterFn(item) {
  console.log(item);
  let filterInputValue = item.target.value.toLowerCase();
  let createdItems = document.querySelectorAll(".items li");
  console.log(createdItems);
  console.log(filterInputValue);
  createdItems.forEach((compareItems) => {
    console.log(compareItems);
    let comparedItem = compareItems.firstChild.textContent.toLowerCase();
    console.log(comparedItem);
    if (comparedItem.indexOf(filterInputValue) == -1) {
      compareItems.style.display = "none";
    } else {
      compareItems.style.display = "flex";
    }
  });
}

function onItemClick(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItemFn(e.target.parentElement.parentElement);
  } else {
    editModeFn(e.target);
  }
}
function editModeFn(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach(i => i.classList.remove("edit-item"));
  item.classList.add("edit-item");
  addButton.style.background = 'green';
  addButton.innerHTML = '<i class="fa-solid fa-xmark"></i> Uptade';
  inputItem.value = item.textContent;
}

function removeItemFn(item) {
  if (confirm("Are you sure you want to remove this item?")) {
    item.remove();
    removeFromStorage(item.textContent);
  }
}

function removeFromStorage(item) {
  let itemFromStorage = getItemsFromStorage();
  console.log(itemFromStorage);
  itemFromStorage = itemFromStorage.filter((i) => i !== item);
  console.log(itemFromStorage);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function removeAllItems() {
  itemList.innerHTML = "";
  //  if (numberOfItems == 0) {
  //    clearAll.style.display = "none";
  //    filterItemBtn.style.display = "none";
  //  }
  localStorage.clear();
}

function addItemsToStorage(item) {
  let itemToStorage;
  if (localStorage.getItem("items") == null) {
    itemToStorage = [];
  } else {
    itemToStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemToStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemToStorage));
}

function getItemsFromStorage() {
  let itemToStorage;
  if (localStorage.getItem("items") == null) {
    itemToStorage = [];
  } else {
    itemToStorage = JSON.parse(localStorage.getItem("items"));
  }
  localStorage.setItem("items", JSON.stringify(itemToStorage));
  return itemToStorage;
}

itemForm.addEventListener("submit", addItem);
clearAll.addEventListener("click", removeAllItems);
filterItemBtn.addEventListener("input", filterFn);
itemList.addEventListener("click", onItemClick);
document.addEventListener("DOMContentLoaded", displayItemFromStorage);
