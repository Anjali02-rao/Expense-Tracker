const categoryInput = document.getElementById("select-category");
const amountInput = document.getElementById("input-amount");
const dateInput = document.getElementById("input-date");
const addButton = document.getElementById("add-button");
const totalAmountDisplay = document.getElementById("total-amount");
const expensesFooter = document.querySelector(".expences-footer");

let totalAmount = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenses.forEach((expense) => {
    addExpenseToDOM(expense.category, expense.amount, expense.date, false);
    totalAmount += expense.amount;
  });
  totalAmountDisplay.textContent = totalAmount.toFixed(0);
}

addButton.addEventListener("click", () => {
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!category || isNaN(amount) || !date) {
    alert("Please fill out all fields!");
    return;
  }

  addExpenseToDOM(category, amount, date);

  totalAmount += amount;
  totalAmountDisplay.textContent = totalAmount.toFixed(0);

  categoryInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
});

function addExpenseToDOM(category, amount, date, save = true) {
  const expenseRow = document.createElement("div");
  expenseRow.classList.add("expense-row");
  expenseRow.style.display = "grid";
  expenseRow.style.gridTemplateColumns = "repeat(4, 1fr)";
  expenseRow.style.textAlign = "center";
  expenseRow.style.justifyContent = "center";
  expenseRow.style.border = "2px solid black";
  expenseRow.style.padding = "5px";

  const categoryCell = document.createElement("div");
  categoryCell.textContent = category;
  expenseRow.appendChild(categoryCell);

  const amountCell = document.createElement("div");
  amountCell.textContent = amount.toFixed(0);
  expenseRow.appendChild(amountCell);

  const dateCell = document.createElement("div");
  dateCell.textContent = date;
  expenseRow.appendChild(dateCell);

  const deleteCell = document.createElement("div");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "var(--red)";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.padding = "5px";
  deleteButton.style.borderRadius = "4px";
  deleteButton.style.cursor = "pointer";

  deleteButton.addEventListener("click", () => {
    expenses = expenses.filter(
      (e) =>
        !(e.category === category && e.amount === amount && e.date === date)
    );
    localStorage.setItem("expenses", JSON.stringify(expenses));

    totalAmount -= amount;
    totalAmountDisplay.textContent = totalAmount.toFixed(0);
    expenseRow.remove();
  });

  deleteCell.appendChild(deleteButton);
  expenseRow.appendChild(deleteCell);

  expensesFooter.appendChild(expenseRow);

  if (save) {
    expenses.push({ category, amount, date });
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

document.addEventListener("DOMContentLoaded", renderExpenses);
