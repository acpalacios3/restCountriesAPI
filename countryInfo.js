const countryInfo = document.getElementById("countryInfo");


// Get the country name from the URL
const parameters = new URLSearchParams(window.location.search);
const countryName = parameters.get("country");

async function fetchCountryInfo() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const countries = await response.json();

        // search the selected country
        const country = countries.find(function (item) {
            return item.name === countryName;
        });

        if (!country) {
            countryInfo.textContent = "Country not found.";
            return;
        }

        // Get currencies
    //     "currencies": [
    //   {
    //     "code": "EUR",
    //     "name": "Euro",
    //     "symbol": "€"
    //   }
    // ],
    
        const currencies = country.currencies
            ? country.currencies.map(function (currency) {
                return currency.name;
            }).join(", ")
            : "N/A";


    //    "languages": [
    //   {
    //     "iso639_1": "fr",
    //     "iso639_2": "fra",
    //     "name": "French",
    //     "nativeName": "français"
    //   }
    // ],     

        // Get languages
        const languages = country.languages
            ? country.languages.map(function (language) {
                return language.name;
            }).join(", ")
            : "N/A";
      

        // Display country details
        countryInfo.innerHTML = `
            <img
                src="${country.flags.png}"
                alt="${country.name} flag"
                width="300"
            >
            <h1>${country.name}</h1>
            <p>Native Name: ${country.nativeName || "N/A"}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region || "N/A"}</p>
            <p>Sub Region: ${country.subregion || "N/A"}</p>
            <p>Capital: ${country.capital || "N/A"}</p>
            <p>Top Level Domain: ${(country.topLevelDomain || []).join(", ") || "N/A"}</p>
            <p>Currencies: ${currencies}</p>
            <p>Languages: ${languages}</p>
        `;

        // border countries
        //   example: France
        //  "borders": ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
        // "name": "Belgium",
        // "topLevelDomain": [".be"],
        // "alpha2Code": "BE",
        // "alpha3Code": "BEL",

        const borderCountriesHTML = document.getElementById("borderCountries");
        const borders = country.borders || [];

        if (borders.length > 0) {
            borders.forEach(function (borderCode) {
                const borderCountry = countries.find(function (item) {
                    return item.alpha3Code === borderCode;
                });

                if (borderCountry) {
                    const button = document.createElement("button");
                    button.textContent = borderCountry.name;

                    button.addEventListener("click", function () {
                        window.location.href =
                            `countryInfo.html?country=${encodeURIComponent(borderCountry.name)}`;
                    });

                    borderCountriesHTML.appendChild(button);
                }
            });
        } else {
            borderCountriesHTML.textContent = "No border countries";
        }
            
                

    } catch (error) {
        console.error("Error loading country:", error);
        countryInfo.textContent = "Unable to load country details.";
    }
}

fetchCountryInfo();



