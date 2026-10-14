let dataCountries = [];

const countryList = document.querySelector("#dataCountries");
const searchCountryI = document.getElementById("searchCountry");
const searchRegionI = document.getElementById("searchRegion");

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

// function to create elements with bold label
function createCountryField(labelText, valueText) {
    const field = document.createElement("p");

    //create bold element 
    const label = document.createElement("strong");

    // create label element  in HTML
    label.classList.add("country-label");
    label.textContent = `${labelText}: `;

    const valueSpan = document.createElement("span");
    valueSpan.textContent = valueText;

    field.appendChild(label);
    field.appendChild(valueSpan);

    return field;
}

function displayCountries(countries) {
    countryList.innerHTML = "";
    countries.forEach((country) => {

        // create li - country
        let listItem = document.createElement("li");
        listItem.classList.add("countryHTML-card");

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

        const population = createCountryField(
            "Population",
            country.population.toLocaleString()
        );

        const capital = createCountryField(
            "Capital",
            country.capital
        );

        const region = createCountryField(
            "Region",
            country.region
        );

        // create container for country information
        const countryInfo = document.createElement("div");
        countryInfo.classList.add("country-info");

        // add the elements inside countryInfo
        countryInfo.appendChild(nameCountry);
        countryInfo.appendChild(population);
        countryInfo.appendChild(region);
        countryInfo.appendChild(capital);

        // add the flag andinformation to the country card
        listItem.appendChild(flag);
        listItem.appendChild(countryInfo);


        //add the country card to the country list    
        countryList.appendChild(listItem);

    });
}

fetchCountries();


function filterCountriesRegion(event) {

    if (event.target === searchRegionI) {

        searchCountryI.value = "";
    }

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

// Toggle the color scheme between light and dark mode
const toggleColorB = document.getElementById("toggleColor");

toggleColorB.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {

        toggleColorB.textContent = "☾ Light Mode";
    } else {
        toggleColorB.textContent = "☽ Dark Mode"

    }
}
);
