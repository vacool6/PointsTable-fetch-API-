// const tbody = document.querySelector("tbody");
const loading = document.querySelector(".loading");
//
const sortOnPoints = document.querySelector(".points");
const sortOnNrr = document.querySelector(".nrr");

const dataMapper = (data, sort) => {
  if (sort) {
    document.querySelector("tbody").remove();
    const tbody = document.createElement("tbody");
    document.querySelector("table").append(tbody);
  }
  for (let i of data) {
    const tr = document.createElement("tr");
    for (let j of Object.keys(i)) {
      const td = document.createElement("td");
      td.append(i[j]);
      tr.append(td);
    }
    document.querySelector("tbody").append(tr);
  }
};

const top3 = () => {
  document.querySelectorAll("tr")[1].style.backgroundColor = "gold";
  document.querySelectorAll("tr")[2].style.backgroundColor = "silver";
  document.querySelectorAll("tr")[3].style.backgroundColor = "brown";
};

const bottom3 = () => {
  document.querySelectorAll("tr")[1].style.backgroundColor = "grey";
  document.querySelectorAll("tr")[2].style.backgroundColor = "grey";
  document.querySelectorAll("tr")[3].style.backgroundColor = "grey";
};

const dataFetch = () => {
  fetch("https://my-json-server.typicode.com/FreSauce/json-ipl/data")
    .then((res) => res.json())
    .then((data) => {
      loading.style.display = "none";
      sortOnPoints.addEventListener("click", () => {
        if (sortOnPoints.getAttribute("sorted") === "false") {
          data.sort((a, b) => a.Points - b.Points);
          dataMapper(data, true);
          bottom3();
          sortOnPoints.setAttribute("sorted", "true");
        } else {
          data.sort((a, b) => b.Points - a.Points);
          dataMapper(data, true);
          top3();
          sortOnPoints.setAttribute("sorted", "false");
        }
      });

      sortOnNrr.addEventListener("click", () => {
        if (sortOnNrr.getAttribute("sorted") === "false") {
          data.sort((a, b) => a.NRR - b.NRR);
          dataMapper(data, true);
          bottom3();
          sortOnNrr.setAttribute("sorted", "true");
        } else {
          data.sort((a, b) => b.NRR - a.NRR);
          dataMapper(data, true);
          top3();
          sortOnNrr.setAttribute("sorted", "false");
        }
      });
      dataMapper(data, false);
    })
    .catch((err) => console.log(err));
};

dataFetch();
