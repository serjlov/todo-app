import "../css/style.css";
import { getNextCheckboxId } from "./utils";

// Get references to elements
const btnList = document.getElementById("add-list");
const input = document.getElementById("input-list");
const ulList = document.getElementById("ul-list");

// Function to save the current list to local storage
function saveListToLocalStorage() {
  const listItems = [];
  const listElements = ulList.querySelectorAll(".ul-inner");

  listElements.forEach((element) => {
    const checkbox = element.querySelector(".checkbox-list");
    const liText = element.querySelector(".li-list");

    listItems.push({
      id: checkbox.id,
      text: liText.innerText,
      checked: checkbox.checked,
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

  // If ID is not provided, generate a new one
  const checkboxId = id || `checkbox-list-id_${getNextCheckboxId()}`;

  // Create a checkbox with a unique ID
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox-list");
  checkbox.setAttribute("id", checkboxId);
  checkbox.checked = checked;

  const liText = document.createElement("li");
  liText.classList.add("li-list");
  liText.innerText = text;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-list");
  deleteIcon.innerText = "🗙";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      liText.style.textDecoration = "line-through";
      liText.style.color = "#E0B0FF";
      liText.style.opacity = 0.5;
    } else {
      liText.style.textDecoration = "none";
      liText.style.color = "white";
      liText.style.opacity = 1;
    }

    saveListToLocalStorage(); // Save changes to local storage
  });

  deleteIcon.addEventListener("click", () => {
    ulInner.remove();
    saveListToLocalStorage(); // Save after deleting
  });

  ulInner.append(checkbox);
  ulInner.append(liText);
  ulInner.append(deleteIcon);

  ulList.append(ulInner);
}

// Event listener for the "Add" button
btnList.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter text before adding it to the list!");
  } else {
    addItemToList(input.value, false);
    saveListToLocalStorage(); // Save after adding a new item

    input.value = ""; // Clear the input field
  }
});

// Event listener for the "Enter" key to trigger list addition
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnList.click(); // Trigger the click event on the "Add" button
  }
});

// Load the list from local storage when the page loads
window.addEventListener("load", loadListFromLocalStorage);
