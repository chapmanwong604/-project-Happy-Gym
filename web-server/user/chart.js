const pie = document.querySelector("#pieChart");
const ctx = document.getElementById("myChart");
const allChart = document.querySelector('#ContainerAllChart')
const weekArray = [];
const sportsTypeArray = [];
const hourArray = [];
const typeHourArray = [];

Chart.defaults.font.size = 13;
Chart.defaults.elements.point.pointStyle = "circle";
Chart.defaults.elements.point.radius = 8;
Chart.defaults.elements.point.backgroundColor = "#7696af";
Chart.defaults.plugins.title.color = "#000000"
Chart.defaults.plugins.title.font = {size:30}
Chart.defaults.elements.line.borderColor = "#000000"
Chart.defaults.elements.arc.borderColor = "#000000"

console.log("HEELLLOOO");

fetch("/Chart")
  .then((res) => res.json())
  .then((json) => {

    if (json[0] == null) {
      allChart.style.display = "none";
      return
    }
    console.log(json[0]);

    extractWeek(json);
    extractTotalHours(json);

    const labels = weekArray;
    const data = {
      labels: labels,
      datasets: [
        {
          label:"Total Hours",
          data: hourArray,
          fill: true,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: "Hours",
            },
            min: 0,
          },
        },
        ticks: {
          // forces step size to be 50 units
          stepSize: 2,
        },
        plugins: {
          title: {
            display: true,
            text: "Weekly workout hours",
          },
          tooltip: {
            callbacks: {
              labelColor: function (context) {
                return {
                  borderColor: "#000000",
                  backgroundColor: "#7696af",
                  borderWidth: 2,
                  borderDash: [2, 2],
                  borderRadius: 2,
                };
              },
              labelTextColor: function (context) {
                return "#dbe5eb";
              },
            },
          },
        },
      },
    });
  });

fetch("/typeChart")
  .then((res) => res.json())
  .then((json) => {
    extractTypeTotalHours(json);
    extractSportsType(json);
    const sum = typeHourArray.reduce((partialSum, a) => partialSum + a, 0);
    const chart = new Chart(pie, {
      type: "pie",
      data: {
        labels: sportsTypeArray,
        datasets: [
          {
            label: "Hours",
            data: typeHourArray,
            backgroundColor: ["#75E6DA", "#D4F1F4", "#189AB4","#7696af","#dbe5eb","#bcceda","#368081","#65edc7","#6664ed","#4b48f4"],
            hoverOffset: 30,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Sports Types Distribution",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                console.log(context);
                return [
                  context.label + ":",
                  Math.round(context.parsed) + "Hours",
                  Math.round((context.parsed / sum) * 100) + "%",
                ];
              },
              labelTextColor: function (context) {
                return "rgb(75, 192, 192)";
              },
            },
          },
        },
      },
    });
  });

function extractSportsType(json) {
  for (let i = 0; i < json.length; i++) {
    sportsTypeArray.push(json[i].sports_type);
  }
}

function extractWeek(json) {
  for (let i = 0; i < json.length; i++) {
    const months = {
      01: "January",
      02: "February",
      03: "March",
      04: "April",
      05: "May",
      06: "June",
      07: "July",
      08: "August",
      09: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    weekArray.push(
      "Week" +
        " " +
        json[i].weekly.substring(8, 10) +
        " " +
        months[Number(json[i].weekly.substring(5, 7))]
    );
  }
}

function extractTotalHours(json) {
  for (let i = 0; i < json.length; i++) {
    hourArray.push(Number(json[i].sum / 60));
  }
}

function extractTypeTotalHours(json) {
  for (let i = 0; i < json.length; i++) {
    typeHourArray.push(Number(json[i].sum / 60));
  }
}
