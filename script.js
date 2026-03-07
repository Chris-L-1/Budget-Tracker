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