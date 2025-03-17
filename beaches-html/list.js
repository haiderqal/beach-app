document.addEventListener("DOMContentLoaded", () => {
    // Dummy Data
    const beachData = {
      weather: "Sunny, 72°F",
      waterTemp: "75 °F",
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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");

  div.style.display = "block"; // Ensure dropdown is visible

  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

  // Hide dropdown if search is empty
  if (input.value === "") {
    div.style.display = "none";
  }


// Hide dropdown when clicking outside
document.addEventListener("click", function (event) {
  let dropdown = document.getElementById("myDropdown");
  let input = document.getElementById("myInput");

  if (!dropdown.contains(event.target) && event.target !== input) {
    dropdown.style.display = "none";
  }
});

fetch('beach_data.json')
  .then(response => response.json())
  .then(data => {
    const beaches = data.beaches;
    const beachContainer = document.getElementById('beach-info');

    beaches.forEach(beach => {
      const beachElement = document.createElement('div');
      beachElement.classList.add('info-section');

      beachElement.innerHTML = `
        <h2>${beach.name} - ${beach.location}</h2>
        <p><strong>Weather:</strong> ${beach.weather.condition}, ${beach.weather.temperature}</p>
        <p><strong>Water Quality:</strong> Bacteria Level - ${beach.real_time_water_quality.bacteria_level}</p>
        <p><strong>Riptide Warning:</strong> ${beach.riptide_warnings.status} - ${beach.riptide_warnings.advice}</p>
        <p><strong>Crowd Level:</strong> ${beach.other_hazards.crowd_level}</p>
      `;

      beachContainer.appendChild(beachElement);
    });
  })
  .catch(error => console.error('Error loading beach data:', error));
