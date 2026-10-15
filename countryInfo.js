import { API_KEY } from "./keys.js";

const API_URL = "https://api.restcountries.com/countries/v5";



const countryInfo = document.getElementById("countryInfo");
const borderCountriesHTML = document.getElementById("borderCountries");

// Get the country name from the URL
const parameters = new URLSearchParams(window.location.search);
const countryName = parameters.get("country");

async function fetchCountryInfo() {
    try {
        // const response = await fetch("./data.json");

        if (!countryName) {
            countryInfo.textContent = "No country selected.";
            return;
        }

        const fields = [
            "names.common",
            "names.native",
            "codes.alpha_3",
            "flag.url_png",
            "population",
            "region",
            "subregion",
            "capitals",
            "tlds",
            "currencies",
            "languages",
            "borders"
        ].join(",");

        const url =
            `${API_URL}/names.common/${encodeURIComponent(countryName)}` +
            `?response_fields=${fields}`;

        
        const response = await fetch(url, {
            headers: {
        Authorization: `Bearer ${API_KEY}`
    }
});

const result = await response.json();

console.log("URL:", url);
console.log("Status:", response.status);
console.log("response:", result);

if (!response.ok) {
    throw new Error(
        `HTTP error: ${response.status} - ${JSON.stringify(result)}`
    );
}

const countries = result.data?.objects || [];

console.log("countries:", countries);

const country = countries.find(function (item) {
    return item.names?.common?.toLowerCase() ===
        countryName.toLowerCase();
});

if (!country) {
    countryInfo.textContent = "Country not found.";
    return;
}

        const nativeName = country.names.native
            ? Object.values(country.names.native)
                .map(item => item.common || item.official)
                .filter(Boolean)
                .join(", ")
            : "N/A";

        const population = country.population != null
            ? country.population.toLocaleString()
            : "N/A";

        const capital = country.capitals
            ?.map(item => item.name)
            .filter(Boolean)
            .join(", ") || "N/A";

        
         const currencies = country.currencies
            ? Object.values(country.currencies)
                .map(item => item.name || item.symbol)
                .filter(Boolean)
                .join(", ")
            : "N/A";

        // Get languages
        const languages = country.languages
            ? Object.values(country.languages)
                .map(item =>
                    typeof item === "string"
                        ? item
                        : item.name || item.english_name || item.native_name
                )
                .filter(Boolean)
                .join(", ")
            : "N/A";
        
        const topLevelDomain = country.tlds?.join(", ") || "N/A";

        // Display country details
       countryInfo.innerHTML = `
            <div class="country-flag-container">
                <img
                    class="country-flag"
                    src="${country.flag?.url_png || ""}"
                    alt="${country.names.common} flag"
                    width="300"
                >
            </div>

            <div class="country-details-content">
                <h2>${country.names.common}</h2>

                <div class="country-details-columns">

                    <div class="country-details-info">
                        <p><strong>Native Name:</strong> ${nativeName}</p>
                        <p><strong>Population:</strong> ${population}</p>
                        <p><strong>Region:</strong> ${country.region || "N/A"}</p>
                        <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
                        <p><strong>Capital:</strong> ${capital}</p>
                    </div>

                    <div class="country-details-add">
                        <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
                        <p><strong>Currencies:</strong> ${currencies}</p>
                        <p><strong>Languages:</strong> ${languages}</p>
                    </div>

                </div>
            </div>
        `;

          // Show a message if the flag cannot be loaded for example Abkhazia
        const flag = countryInfo.querySelector(".country-flag");

        flag.onerror = function () {
            flag.onerror = null;
            flag.alt = "Flag not available";
        };


        /// Move Border Countries below the country details
        const borderSection = document.getElementById("borderSection");
        const detailsContent = countryInfo.querySelector(".country-details-content");

        if (borderSection && detailsContent) {
            detailsContent.appendChild(borderSection);
        }

        // border countries
        await displayBorderCountries(country.borders || []);

    } catch (error) {
        console.error("Error loading country:", error);
        countryInfo.textContent = "Unable to load country details.";
    }
}

// Get and display border countries
async function displayBorderCountries(borders) {
    borderCountriesHTML.innerHTML = "";

    if (borders.length === 0) {
        borderCountriesHTML.textContent = "No border countries";
        return;
    }

    const fields = "names.common,codes.alpha_3";

    // Request each border country
    const borderPromises = borders.map(async function (borderCode) {
        try {
            const url =
                `${API_URL}/codes.alpha_3/${encodeURIComponent(borderCode)}` +
                `?response_fields=${fields}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            console.log("API:", result);

            const countries = result.data?.objects || [];

            console.log("countries:", countries);

            return result.data.objects?.[0] || null;

        } catch (error) {
            console.error(`Error loading border ${borderCode}:`, error);
            return null;
        }
    });

    const borderCountries = await Promise.all(borderPromises);

    borderCountries.forEach(function (borderCountry) {
        if (!borderCountry) {
            return;
        }

        const button = document.createElement("button");
        button.textContent = borderCountry.names.common;

        button.addEventListener("click", function () {
            window.location.href =
                `countryInfo.html?country=${encodeURIComponent(
                    borderCountry.names.common
                )}`;
        });

        borderCountriesHTML.appendChild(button);
    });

    if (borderCountriesHTML.children.length === 0) {
        borderCountriesHTML.textContent = "Border countries unavailable";
    }
}


fetchCountryInfo();

// Toggle the color scheme between light and dark mode
const toggleColorB = document.getElementById("toggleColor");

toggleColorB.addEventListener("click", ()=>{

    document.body.classList.toggle("dark-mode");
   if (document.body.classList.contains("dark-mode")){

     toggleColorB.textContent = "Light Mode";            
   } else {
     toggleColorB.textContent = "Dark Mode"

   }
}
);



