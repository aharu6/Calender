document.addEventListener("DOMContentLoaded", function () {
  const calnederheader = document.getElementById("calendar-header");
  const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayWeek.forEach((day) => {
    const th = document.createElement("th");
    th.classList.add("day-of-week");
    th.textContent = day;
    calnederheader.appendChild(th);
  });

  const calender = document.getElementById("calender");
  const click = document.getElementById("click");
  let clickCount = 0;

  let clickedDates = JSON.parse(localStorage.getItem("clickedDates")) || {};
  //generate calender
  function generateCalender(year, month) {
    calender.innerHTML = "";
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    //空白セルのための前の月の日数
    const firstWeekDay = firstDay.getDay();
    for (let i = 0; i < firstWeekDay; i++) {
      const emptycell = document.createElement("th");
      calender.appendChild(emptycell);
    }
    //日付セル
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const cell = document.createElement("th");
      calender.appendChild(cell);
      cell.textContent = date;
      cell.classList.add("cell");

      //クリック状態の復元
      const dateKey = "${year}-${month + 1}-${date}";
      if (clickedDates[dateKey]) {
        cell.classList.add("clicked");
        clickCount++;
      }

      cell.addEventListener("click", function () {
        cell.classList.toggle("clicked");
        const iscliked = cell.classList.contains("clicked");
        if (iscliked) {
          clickedDates[dateKey] = true;
          clickCount++;
        } else {
          delete clickedDates[dateKey];
          clickCount--;
        }
        localStorage.setItem("clickedDates", JSON.stringify(clickedDates));
        click.textContent = `clickCount: ${clickCount} `;
        console.log(clickCount);
      });
    }
  }
  const today = new Date();
  generateCalender(today.getFullYear(), today.getMonth());

  const month = document.getElementById("month");
  month.textContent = today.getMonth() + 1;
  //prev month
  const prev = document.getElementById("preview");
  prev.addEventListener("click", function () {
    today.setMonth(today.getMonth() - 1);
    generateCalender(today.getFullYear(), today.getMonth());
    month.textContent = today.getMonth() + 1;
  });
  //next month
  const next = document.getElementById("next");
  next.addEventListener("click", function () {
    today.setMonth(today.getMonth() + 1);
    generateCalender(today.getFullYear(), today.getMonth());
    month.textContent = today.getMonth() + 1;
  });
});
