import { API_KEY } from "./keys.js";    

const API_URL = "https://api.restcountries.com/countries/v5";


let dataCountries = [];

const countryList = document.querySelector("#dataCountries");
const searchCountryI = document.getElementById("searchCountry");
const searchRegionI = document.getElementById("searchRegion");

// get data from REST Countries API 
async function fetchCountries() {
    try {
        const countries = [];
        let offset = 0;
        let more = true;

        while (more) {
                const url =
                    `${API_URL}?limit=100&offset=${offset}` +
                    `&response_fields=names.common,codes.alpha_3,population,capitals,region,flag.url_png`;

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                });

                if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(
                    `HTTP error: ${response.status} - ${errorDetails}`
                );
            }

                // const result = await response.json();

                console.log("Status:", response.status);

                const result = await response.json();
                console.log("Respuesta:", result);
                console.log("Data:", result.data);
                console.log("Objects:", result.data?.objects);


                countries.push(...result.data.objects);

                more = result.data.meta.more;
                offset += 100;
                // offset += result.data.meta.limit;
        }

        // Adapt API data to the structura similar File data.json
        dataCountries = countries.map(country => ({
            name: country.names.common,
            cca3: country.codes.alpha_3,
            flags: {
                png: country.flag.url_png
            },
            population: country.population,
            capital: country.capitals?.map(capital => capital.name) ?? [],
            region: country.region
        }));


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


        // image flag
        const flag = document.createElement("img");
        flag.src = country.flags.png;
        flag.alt = `${country.name} flag`;

        // Show a message if the flag cannot be loaded for example Abkhazia
        flag.onerror = function () {
                flag.onerror = null;
                flag.alt = "image not available";
        };




        // data countries
        const nameCountry = document.createElement("h2");
        nameCountry.textContent = country.name;

        const population = createCountryField(
            "Population",
            country.population.toLocaleString()
        );

        const capital = createCountryField(
            "Capital",
            country.capital.join(", ") || "N/A"
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

// filter countries by name and region
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
