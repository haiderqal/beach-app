document.addEventListener("DOMContentLoaded", () => {
    // Dummy Data
    const beachData = {
      weather: "Sunny, 75°F",
      waterTemp: "68°F",
      bacteria: "Safe levels",
      riptide: "Low risk",
      sealife: ["Dolphins spotted", "Jellyfish warning"],
      hazards: "None reported",
    };
  
    // Populate Data
    document.getElementById("weather").textContent = beachData.weather;
    document.getElementById("water-temp").textContent = beachData.waterTemp;
    document.getElementById("bacteria").textContent = beachData.bacteria;
    document.getElementById("riptide").textContent = beachData.riptide;
    
    // Sealife List
    const sealifeList = document.getElementById("sealife");
    sealifeList.innerHTML = "";
    beachData.sealife.forEach((animal) => {
      const li = document.createElement("li");
      li.textContent = animal;
      sealifeList.appendChild(li);
    });
  
    // Hazards
    document.getElementById("hazards").textContent = beachData.hazards;
  });
  
  function navigateTo(url) {
    window.location.href = url;
  }
  
  fetch('beach_data.json') // Load the JSON file
  .then(response => response.json())
  .then(data => {
    console.log(data.beaches); // Check the data in the console

    // Example: Display the first beach's name
    document.getElementById("beach-name").innerText = data.beaches[0].name;
  })
  .catch(error => console.error('Error loading JSON:', error));
