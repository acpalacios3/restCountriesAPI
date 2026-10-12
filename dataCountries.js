let dataCountries = [];

 const countryList = document.querySelector("#dataCountries");
 const searchCountryI = document.getElementById("searchCountry");
 const searchRegionI =  document.getElementById("searchRegion");

// get data from a Json file
async function fetchCountries() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        dataCountries = await response.json();
        console.log("Data Countries:", dataCountries);
     
        // display countries
        displayCountries(dataCountries);
    } catch (error) {
        console.error("Unknown error:", error);
        throw error;
    };
}



function displayCountries(countries){
countryList.innerHTML = "";
countries.forEach((country) => {
    
            // create li - country
            let listItem = document.createElement("li");
            listItem.classList.add("countryHTML");

            // navigate to another page and proceed to send the name of the selected country
            listItem.addEventListener("click", function () {
                window.location.href =
                    `countryInfo.html?country=${encodeURIComponent(country.name)}`;
            });

 
            // image data
            const flag = document.createElement("img");
            flag.src = country.flags.png;
            flag.alt = `${country.name} flag`;

            // data countries
            const nameCountry = document.createElement("h2");
            nameCountry.textContent = country.name;

            const population = document.createElement("p");
            population.textContent = `Population: ${country.population.toLocaleString()}`;

            let capital = document.createElement("h2");
            capital.textContent = `Capital:  ${country.capital}`;

             let region = document.createElement("p");
            region.textContent = `Region:  ${country.region}`;

            // add the elements to li in HTML
           listItem.appendChild(flag);
           listItem.appendChild(nameCountry);
           listItem.appendChild(population);
           listItem.appendChild(region);
           listItem.appendChild(capital);

            // Make listItem a child of countryList
           countryList.appendChild(listItem);
     
        });
}

fetchCountries();


function filterCountriesRegion(){
   
    const countryInput = searchCountryI.value.toLowerCase().trim(); 
    const regionSelect = searchRegionI.value;
   
    const filterCountries = dataCountries.filter(function (country) {

        const countryName = country.name.toLowerCase().includes(countryInput);
        const regionName = country.region === regionSelect || regionSelect === "";

        return countryName && regionName;
    });

     displayCountries(filterCountries);
}

// filter while typing
searchCountryI.addEventListener("input", filterCountriesRegion);

// filter when select a region
searchRegionI.addEventListener("change", filterCountriesRegion);



