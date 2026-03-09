//Budgetly - Budget Tracker Application
//Author: Chris Lufuilu
//Description: Handles all functionality for the Budgetly budget tracker

//Declaration of an empty array
let transactions = [];

const form = document.getElementById("transaction-form");
const descriptionInput= document.getElementById("description");
const amountInput= document.getElementById("amount");
const typeInput= document.getElementById("type");
const categoryInput= document.getElementById("category");
const filterSelect = document.getElementById("filter");
const transactionList = document.getElementById("transaction-list");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const balanceAmount = document.getElementById("balance-amount");
const themeToggle = document.getElementById("theme-toggle");

//Storing the income category as arrays of objects
const incomeCategories =[
  {value : "salary", label:"Salary"},
  {value : "freelance", label: "Freelance"},
  {value : "others", label:"Others"}
]

//Storing the expense category as arrays of objects
const expenseCategories =[
  {value:"housing-and-rent", label:"House and Rent"},
  {value:"food-and-groceries", label:"Food and Groceries"},
  {value:"transport", label:"Transport"},
  {value:"healthcare", label:"Healthcare"},
  {value:"education", label:"Education"},
  {value:"shopping", label:"Shopping"},
  {value:"utilities",label:"Utilities"},
  {value:"others", label:"Others"}
]

/**
 * Populates the category dropdown based on the selected transaction type.
 * Clears existing options and dynamically fills the select input
 * with either income or expense categories.
 *
* @param {"income" | "expense"} type - Transaction type
 */

function populateCategories(type) {

  categoryInput.innerHTML=""

  const categories = type === "income" ? incomeCategories : expenseCategories

  categories.forEach(function(category){
    const option= document.createElement("option");
    option.value= category.value
    option.textContent= category.label;
    categoryInput.appendChild(option);
  })
}

// Call populateCategories when type dropdown changes
typeInput.addEventListener("change" , function(){
  populateCategories(typeInput.value);
});

//Populate categories on page load
populateCategories(typeInput.value)


//Handle form submission - create and store new transaction
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const transaction ={

    id:Date.now(),
    description:descriptionInput.value.trim(),
    amount:parseFloat(amountInput.value),
    type:typeInput.value,
    category:categoryInput.value,
    date:new Date().toLocaleDateString("en-ZA")
  };

  transactions.push(transaction);
  saveTransactions();
  displayTransactions();
  updateSummary();
  form.reset();
  populateCategories(typeInput.value)
});


// Render all transactions to the transaction history panel
function displayTransactions() {
   // Clear existing list before re-rendering
    transactionList.innerHTML = "";

      // Show message if no transactions exist
    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions yet</li>";
        return;
    }

     // Loop through each transaction and create a list item
    transactions.forEach(function(transaction) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.category}</span>
            <span>${transaction.date}</span>
            <span class="${transaction.type === "income" ? "income" : "expense"}">
                ${transaction.type === "income" ? "+" : "-"}R${transaction.amount.toFixed(2)}
            </span>
            <button onclick="deleteTransaction(${transaction.id})">✕</button>
        `;
        transactionList.appendChild(li);
    });
}

// Calculate and update the three summary cards
function updateSummary (){
    // Total all income transactions
  const income = transactions
  .filter (t => t.type === "income")
  .reduce((total , t) => total + t.amount, 0);

  // Total all expense transactions
  const expenses = transactions
  .filter(t => t.type === "expense")
  .reduce((total, t) => total + t.amount, 0);

    // Calculate balance
  const balance = income - expenses;

  // Update the DOM elements with formatted values
  incomeAmount.textContent = "R " + income.toFixed(2);
  expenseAmount.textContent= "R " + expenses.toFixed(2);
  balanceAmount.textContent= "R " + balance.toFixed(2);
}

// Remove a transaction by id and refresh the display
function deleteTransaction (id){
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  displayTransactions();
  updateSummary();
}

filterSelect.addEventListener ("change" , function(){

  const filterValue = filterSelect.value;


if (filterValue === "all"){
  displayTransactions();
  return;
}
transactionList.innerHTML="";

const filterd = transactions.filter(t => t.category === filterValue);


if (filterd.length === 0){
  transactionList.innerHTML = "<li>No transactions found</li>";
  return;
}

  filterd.forEach(function(transaction) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.category}</span>
            <span>${transaction.date}</span>
            <span class="${transaction.type === "income" ? "income" : "expense"}">
                ${transaction.type === "income" ? "+" : "-"}R${transaction.amount.toFixed(2)}
            </span>
            <button onclick="deleteTransaction(${transaction.id})">✕</button>
        `;
        transactionList.appendChild(li);
    });

});

// Save transactions to localStorage

function saveTransactions(){
  localStorage.setItem("transactions" , JSON.stringify(transactions));

}

// Load transactions from localStorage
function loadTransactions(){
  const stored = localStorage.getItem("transactions")
  if (stored){
    transactions = JSON.parse(stored);
  }
  displayTransactions();
  updateSummary();
}

loadTransactions();

// Toggle dark mode on and off

themeToggle.addEventListener("click" , function(){
  document.body.classList.toggle("dark-mode");

if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent="☀️";
    localStorage.setItem("theme" , "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent="☀️"

}
