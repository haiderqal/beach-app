// Function to get the beach name from URL parameters
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch beach data
fetch("beach_data.json")
    .then(response => response.json())
    .then(data => {
        const beachName = getQueryParam("beach"); // Get the beach name from the URL
        const beaches = data.beaches;
        const selectedBeach = beaches.find(beach => beach.name === beachName);

        if (selectedBeach) {
            document.getElementById("beach-name").textContent = selectedBeach.name;
            document.getElementById("weather").textContent = `${selectedBeach.weather.condition}, ${selectedBeach.weather.temperature}`;
            document.getElementById("water-temp").textContent = `${selectedBeach.weather.water_temperature}`;
            document.getElementById("bacteria").textContent = `Bacteria Level: ${selectedBeach.real_time_water_quality.bacteria_level}`;
            document.getElementById("riptide").textContent = `${selectedBeach.riptide_warnings.status} - ${selectedBeach.riptide_warnings.advice}`;
            document.getElementById("hazards").textContent = `Air Quality: ${selectedBeach.other_hazards.air_quality}, Allergy Alert: ${selectedBeach.other_hazards.allergy_alert}`;

            // Update Sealife
            const sealifeList = document.getElementById("sealife");
            sealifeList.innerHTML = "";
            if (selectedBeach.real_time_water_quality.shark_sightings !== "None reported") {
                let li = document.createElement("li");
                li.textContent = `Shark Sightings: ${selectedBeach.real_time_water_quality.shark_sightings}`;
                sealifeList.appendChild(li);
            } else {
                let li = document.createElement("li");
                li.textContent = "No unusual sealife sightings";
                sealifeList.appendChild(li);
            }

            // Update Beach Image
            document.getElementById("beach-image").src = `images/${beachName.toLowerCase().replace(/ /g, "-")}.jpg`;
            document.getElementById("beach-image").alt = selectedBeach.name;
        } else {
            document.getElementById("beach-name").textContent = "Beach Not Found";
        }
    })
    .catch(error => console.error("Error loading JSON:", error));

// Function to navigate to other pages
function navigateTo(page) {
    window.location.href = page;
}
