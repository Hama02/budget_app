//Initialize the date
let today = new Date();
let date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
document.querySelector(".date").textContent = date;
let budget = document.querySelector(".budget");
const btn = document.querySelector(".add_btn");

//Check inputs Border Color
document.querySelector("select").onchange = (event) => {
  let inputs = document.querySelectorAll("input");
  let type =
    document.querySelector(".add_type")[
      document.querySelector(".add_type").selectedIndex
    ].textContent;
  if (type == "+") {
    btn.style.color = "#28B9B5";
    event.currentTarget.classList.remove("red-focus");
    event.currentTarget.classList.add("blue-focus");
    inputs.forEach((ele) => {
      ele.classList.remove("red-focus");
      ele.classList.add("blue-focus");
    });
  } else {
    btn.style.color = "red";
    event.currentTarget.classList.remove("blue-focus");
    event.currentTarget.classList.add("red-focus");
    inputs.forEach((ele) => {
      ele.classList.remove("blue-focus");
      ele.classList.add("red-focus");
    });
  }
};
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
  }"></span>`;
  if (type == "+") document.querySelector(".income_section").append(content);
  else document.querySelector(".expenses_section").append(content);
  check_bg(type);
  document.querySelector(
    `${type == "+" ? ".curr_income" : ".curr_expenses"}`
  ).firstChild.textContent = `${type} ${check_money(type)}`;
  updateBudget();
  updatePercent();
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

function updatePercent() {
  let expense_content = document
    .querySelector(".expenses_section")
    .querySelectorAll(".content");
  expense_content.forEach((ele) => {
    let val = +ele.firstElementChild.firstChild.textContent.slice(2);
    if (check_money("+") != 0)
      ele.firstElementChild.firstElementChild.textContent = `${(
        (val / check_money("+")) *
        100
      ).toFixed(2)} %`;
  });
  document.querySelector(".curr_expenses").firstElementChild.textContent = `${(
    (check_money("-") / check_money("+")) *
    100
  ).toFixed(2)} %`;
}
