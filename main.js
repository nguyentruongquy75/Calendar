const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();

const dayOfMonth = [
  31,
  isLeapYear(date.getFullYear()) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
  return false;
}

function render(month, year) {
  const calendarMonth = document.querySelector(".calendar__month");
  const calendarYear = document.querySelector(".calendar__year-num");
  const calendarDayList = document.querySelector(".calendar__day-num-list");

  month = month ?? date.getMonth();
  year = year ?? date.getFullYear();

  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  calendarMonth.textContent = months[month];
  calendarYear.textContent = year;

  calendarDayList.innerHTML = "";

  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  for (let index = 0; index < firstDayOfMonth; index++) {
    const divElement = document.createElement("div");
    calendarDayList.append(divElement);
  }

  for (let index = 1; index <= dayOfMonth[month]; index++) {
    calendarDayList.insertAdjacentHTML(
      "beforeend",
      `<div class="calendar__day-num-item ${
        index === currentDay && currentMonth == month && currentYear === year
          ? "calendar__day-num-item--active"
          : ""
      }">${index}</div>`
    );
  }
}

function getFirstDayOfMonth(month, year) {
  date.setDate(1);
  date.setMonth(month);
  date.setFullYear(year);
  return date.getDay();
}

function handleEventMonth() {
  const monthItems = document.querySelectorAll(".months-item");
  const calendarMonth = document.querySelector(".calendar__month");
  const months = document.querySelector(".months");

  calendarMonth.addEventListener("click", function () {
    months.classList.add("grid");
  });

  monthItems.forEach(function (ele) {
    ele.addEventListener("click", function () {
      months.classList.remove("grid");
      render(this.dataset.month);
    });
  });
}

function handleYear() {
  const calendarYearPrev = document.querySelector(".calendar__year-prev");

  const calendarYearNext = document.querySelector(".calendar__year-next");

  calendarYearPrev.addEventListener("click", function () {
    render(date.getMonth(), date.getFullYear() - 1);
  });

  calendarYearNext.addEventListener("click", function () {
    render(date.getMonth(), date.getFullYear() + 1);
  });
}

function handleChangeTheme() {
  const changeThemeInput = document.querySelector("#switch-theme");

  changeThemeInput.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
}

render();
handleEventMonth();
handleYear();
handleChangeTheme();
