let dataCountries = [];

 const countryList = document.querySelector("#dataCountries");
 const searchButtonI = document.getElementById('searchButton');
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

console.log("button:", searchRegionI);

// filter countries and  region

searchButtonI.addEventListener("click", function () {
    const region = searchRegionI.value;

    console.log("Region seleccionada:", region);

    const filterCountries = dataCountries.filter(function (country) {
        return country.region === region || region === "";
    });

    console.log("Países filtrados:", filterCountries);

    displayCountries(filterCountries);
});

