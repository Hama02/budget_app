//Initialize the date
let today = new Date();
let date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
document.querySelector(".date").textContent = date;
let budget = document.querySelector(".budget");
const btn = document.querySelector(".add_btn");

//Event Handler
btn.addEventListener("click", (event) => {
  let type =
    document.querySelector(".add_type")[
      document.querySelector(".add_type").selectedIndex
    ].textContent;
  let desc = document.querySelector(".add_description").value;
  let val = document.querySelector(".add_value").value;
  let content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = `${desc} <div class="${
    type == "+" ? "plus" : "minus"
  }">${type} ${val} <span class="percent ${
    type == "+" ? "hidden" : "inline-block"
  }">5%</span>`;
  if (type == "+") document.querySelector(".income_section").append(content);
  else document.querySelector(".expenses_section").append(content);
  check_bg(type);
  document.querySelector(
    `${type == "+" ? ".curr_income" : ".curr_expenses"}`
  ).firstChild.textContent = `${type} ${check_money(type)}`;
  updateBudget();
});

function check_bg(sign) {
  let contents = document
    .querySelector(`.${sign == "+" ? "income_section" : "expenses_section"}`)
    .querySelectorAll(".content");
  contents.forEach((ele, index) => {
    if (sign == "+") {
      if (index % 2 != 0) ele.classList.add("bg-midColor");
    } else if (sign == "-")
      if (index % 2 == 0) ele.classList.add("bg-midColor");
  });
}

function check_money(sign) {
  let sum = 0;
  let contents = document
    .querySelector(`.${sign == "+" ? "income_section" : "expenses_section"}`)
    .querySelectorAll(".content");
  contents.forEach((ele) => {
    let curr_val = ele.firstElementChild.firstChild.textContent;
    sum += Number(curr_val.slice(1));
  });
  return sum.toFixed(2);
}

function updateBudget() {
  let diff = check_money("+") - check_money("-");
  budget.textContent = `${diff >= 0 ? "+" : "-"} ${Math.abs(diff).toFixed(2)}`;
}
