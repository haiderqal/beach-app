// Function to get the beach name from URL parameters
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch beach data from my json file
fetch("beach_data.json")
    .then(response => response.json())
    .then(data => {
        const beachName = getQueryParam("beach"); // <-- Get the beach name from the URL
        const beaches = data.beaches;
        const selectedBeach = beaches.find(beach => beach.name === beachName);

        if (selectedBeach) {
            document.getElementById("beach-name").textContent = selectedBeach.name;
            document.getElementById("weather").textContent = `${selectedBeach.weather.condition}, ${selectedBeach.weather.temperature}`;
            document.getElementById("water-temp").textContent = `${selectedBeach.weather.water_temperature}`;
            document.getElementById("bacteria").textContent = `Bacteria Level: ${selectedBeach.real_time_water_quality.bacteria_level}`;
            document.getElementById("riptide").textContent = `${selectedBeach.riptide_warnings.status} - ${selectedBeach.riptide_warnings.advice}`;
            document.getElementById("hazards").textContent = `Air Quality: ${selectedBeach.other_hazards.air_quality}, Allergy Alert: ${selectedBeach.other_hazards.allergy_alert}`;

            // Sealife
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

            // Update beach image
            // document.getElementById("beach-image").src = `images/${beachName.toLowerCase().replace(/ /g, "-")}.jpg`;
           //  document.getElementById("beach-image").alt = selectedBeach.name;

            // 🎥 Video logic
            const beachVideo = document.getElementById("beach-video");
            const beachVideoSrc = document.getElementById("beach-video-src");

            const videoFileName = beachName.toLowerCase().replace(/ /g, "-") + ".mp4";
            const videoPath = `images/${videoFileName}`;

            fetch(videoPath, { method: "HEAD" })
                .then((res) => {
                    if (res.ok) {
                        beachVideoSrc.src = videoPath;
                        beachVideo.load();
                        beachVideo.style.display = "block";
                    } else {
                        beachVideo.style.display = "none";
                    }
                })
                .catch(() => {
                    beachVideo.style.display = "none";
                });

        } else {
            document.getElementById("beach-name").textContent = "Beach Not Found";
        }
    })
    .catch(error => console.error("Error loading JSON:", error));

// Function to navigate to other pages
function navigateTo(page) {
    window.location.href = page;
}


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