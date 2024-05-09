import "../css/style.css";
import { getNextCheckboxId } from "./utils";

// References to elements
const btnList = document.getElementById("add-list");
const input = document.getElementById("input-list");
const ulList = document.getElementById("ul-list");

// Function to apply styles based on checkbox state
function applyStyles(checkbox, liText) {
  if (checkbox.checked) {
    liText.style.textDecoration = "line-through";
    liText.style.color = "#E0B0FF";
    liText.style.opacity = 0.5;
  } else {
    liText.style.textDecoration = "none";
    liText.style.color = "white";
    liText.style.opacity = 1;
  }
}

// Function to save the list to local storage
function saveListToLocalStorage() {
  const listItems = [];
  const listElements = ulList.querySelectorAll(".ul-inner");

  listElements.forEach((element) => {
    const checkbox = element.querySelector(".checkbox-list");
    const liText = element.querySelector(".li-list");

    listItems.push({
      id: checkbox.id,
      text: liText.innerText,
      checked: checkbox.checked, // Save the checkbox state
    });
  });

  // Save to local storage
  localStorage.setItem("my-list", JSON.stringify(listItems));
}

// Function to load the list from local storage
function loadListFromLocalStorage() {
  const savedItems = localStorage.getItem("my-list");

  if (savedItems) {
    const listItems = JSON.parse(savedItems);

    listItems.forEach((item) => {
      addItemToList(item.text, item.checked, item.id);
    });
  }
}

// Function to add an item to the list
function addItemToList(text, checked, id = null) {
  const ulInner = document.createElement("div");
  ulInner.classList.add("ul-inner");

  const checkboxId = id || `checkbox-list-id_${getNextCheckboxId()}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox-list");
  checkbox.setAttribute("id", checkboxId);
  checkbox.checked = checked; // Initialize with the correct state

  const liText = document.createElement("li");
  liText.classList.add("li-list");
  liText.innerText = text;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-list");
  deleteIcon.innerText = "x";

  // Apply styles based on the checkbox state
  applyStyles(checkbox, liText);

  checkbox.addEventListener("change", () => {
    applyStyles(checkbox, liText); // Apply styles when the checkbox is changed
    saveListToLocalStorage(); // Save the updated list
  });

  deleteIcon.addEventListener("click", () => {
    ulInner.remove();
    saveListToLocalStorage(); // Save after deleting an item
  });

  ulInner.append(checkbox);
  ulInner.append(liText);
  ulInner.append(deleteIcon);

  ulList.append(ulInner);
}

// Event handler for the "Add" button
btnList.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter text before adding it to the list!");
  } else {
    addItemToList(input.value, false);
    saveListToLocalStorage(); // Save after adding a new item

    input.value = ""; // Clear the input field
  }
});

// Trigger list addition with "Enter" key
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnList.click(); // Simulate click on the "Add" button
  }
});

// Load the list when the page is loaded
window.addEventListener("load", loadListFromLocalStorage);
