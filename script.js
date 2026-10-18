// Select the element where the temperature will be displayed
const showTemperature = document.querySelector(".show-temperature");

// Select the search input field
const userText = document.querySelector(".search-bar");
//Loading animation
const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");

// Object containing Indian cities as keys
// Each city has its latitude and longitude
const indianCities = {
  Hyderabad: {
    latitude: 17.385,
    longitude: 78.4867,
  },
  Vijayawada: {
    latitude: 16.5062,
    longitude: 80.648,
  },
  Visakhapatnam: {
    latitude: 17.6868,
    longitude: 83.2185,
  },
  Chennai: {
    latitude: 13.0827,
    longitude: 80.2707,
  },
  Bengaluru: {
    latitude: 12.9716,
    longitude: 77.5946,
  },
  Mumbai: {
    latitude: 19.076,
    longitude: 72.8777,
  },
  Delhi: {
    latitude: 28.6139,
    longitude: 77.209,
  },
  Kolkata: {
    latitude: 22.5726,
    longitude: 88.3639,
  },
  Pune: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  Ahmedabad: {
    latitude: 23.0225,
    longitude: 72.5714,
  },
};

// Get the city name entered by the user,
// find its coordinates, and request weather data
function getUserInput() {
  // Read the text typed in the search bar and remove extra spaces
  let userInput = userText.value.trim();

  // Find the selected city object using bracket notation
  const city = indianCities[userInput];

  // Clear any previous temperature message
  showTemperature.textContent = "";

  // If the entered city does not exist in the object,
  // show an error message and stop
  if (!city) {
    showTemperature.textContent = "invalid city";
  } else {
    // Build the Open-Meteo API URL using the selected city's coordinates
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    // Request the weather data
    getWeather(url);
  }
}

// Fetch weather data from the Open-Meteo API
async function getWeather(url) {
  showLoading();
  try {
    
    // Send the request and wait for the response
    let response = await fetch(url);

    // If the request was not successful, throw an error
    if (!response.ok) {
      throw new Error("failed");
    }

    // Convert the JSON response into a JavaScript object
    let data = await response.json();

    // Get the current weather report
    const report = data.current;

    // Display the temperature on the page
    displayWeather(report);
  } catch (Error) {
    // Handle any error that occurs during the request
    console.log(Error);
    showTemperature.textContent = "Unable to load weather";
  } finally {
    hideLoading();
  }
}

// Display the temperature in the selected HTML element
function displayWeather(report) {
  showTemperature.textContent = `Temperature ${report.temperature_2m}`;
}

//Loading animation while featching data
function showLoading() {
  loader.style.display = "block";
  loadingText.style.display = "block";
  showTemperature.textContent = "";
}

function hideLoading() {
  loader.style.display = "none";
  loadingText.style.display = "none";
}
