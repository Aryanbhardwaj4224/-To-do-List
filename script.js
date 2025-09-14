const inputBox = document.querySelector(".inputBox");
const addBtn = document.querySelector(".addBtn");
const todoList = document.querySelector(".todoList");

let inputValue;

// Function to enable/disable Add button based on input
function disabled() {
  if (!inputValue) {
    addBtn.disabled = true;
    addBtn.classList.add("disabled");
  } else {
    addBtn.disabled = false;
    addBtn.classList.remove("disabled");
  }
}

// Initialize button state on page load
disabled();

// Update inputValue and button state whenever user types
inputBox.addEventListener("input", (event) => {
  inputValue = event.target.value;
  disabled();
});

let currentEditingLi = null;

// Handle Add / Replace button click
addBtn.addEventListener("click", () => {
  inputValue = inputBox.value;
  if (!inputValue) return;
  // --------- ADD NEW TASK ---------
  if (addBtn.value === "Add") {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const DeleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    span.textContent = inputValue;
    DeleteBtn.textContent = "remove";
    DeleteBtn.classList.add("deleteBtn");
    editBtn.textContent = "edit";
    editBtn.classList.add("EditBtn");

    // Append buttons to div, span and div to li, and li to UL
    todoList.appendChild(li);
    div.appendChild(editBtn);
    div.appendChild(DeleteBtn);
    li.appendChild(span);
    li.appendChild(div);

    inputBox.value = "";
    inputValue = "";
    disabled();
    // --------- DELETE FUNCTIONALITY ---------
    DeleteBtn.addEventListener("click", () => {
      todoList.removeChild(li);
      inputBox.focus();
    });

    // --------- EDIT FUNCTIONALITY ---------
    editBtn.addEventListener("click", () => {
      addBtn.value = "replace";
      inputBox.value = span.textContent; // Show current task in input
      inputValue = span.textContent;
      disabled();
      currentEditingLi = li; // Store reference to this li
      inputBox.focus();
    });
  }

  // --------- REPLACE EXISTING TASK ---------
  else if (addBtn.value === "replace") {
    // Update the text of the currently editing li
    currentEditingLi.querySelector("span").textContent = inputValue;

    // Reset button, input, and editing reference

    addBtn.value = "Add";
    inputBox.value = "";
    currentEditingLi = null;
    disabled();
    inputBox.focus();
  }
});
