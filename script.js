//Budgetly - Budget Tracker Application
//Author: Chris Lufuilu
//Description: Handles all functionality for the Budgetly budget tracker

let transactions = [];
const form = document.getElementById("transaction-form");
const  descriptionInput= document.getElementById("description");
const  amountInput= document.getElementById("amount");
const  typeInput= document.getElementById("type");
const  categoryInput= document.getElementById("category");
const filterSelect = document.getElementById("filter");
const transactionList = document.getElementById("transaction-list");
const  incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const  balanceAmount = document.getElementById("balance-amount");
const themeToggle = document.getElementById("theme-toggle");
