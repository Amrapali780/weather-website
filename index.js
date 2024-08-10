

var inputvalue = document.querySelector("#cityinput");
var btn = document.querySelector("#fetchData");
var city = document.querySelector("#cityoutput");
var description = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");

var apik = "0c5d7d0329160a17a8caf44b1e964ef7";

function conversion(val) {
  return (val - 273.15).toFixed(2); 
}

btn.addEventListener("click", function () {
  var cityName = inputvalue.value;
  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apik
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }

      var nameval = data["name"];
      var descrip = data["weather"][0]["description"];
      var temperature = data["main"]["temp"];
      var windspeed = data["wind"]["speed"];

      city.innerHTML = "Weather of <span>" + nameval + "</span>";
      temp.innerHTML =
        "Temperature: <span>" + conversion(temperature) + " °C</span>";
      description.innerHTML = "Description: <span>" + descrip + "</span>";
      wind.innerHTML = "Wind Speed: <span>" + windspeed + " km/h</span>";
    })
    .catch((err) => alert("Error: " + err.message));
});
