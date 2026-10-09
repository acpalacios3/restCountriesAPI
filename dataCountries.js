let dataCountries = [];

async function fetchCountries() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        dataCountries = await response.json();

        const countryList = document.querySelector("#dataCountries");

        console.log("Data Countries:", dataCountries);

        dataCountries.forEach((country) => {

            // create li - country
            let listItem = document.createElement("li");
            listItem.textContent = country.name;

            let capital = document.createElement("p");
            capital.textContent = `Capital:  ${country.capital}`;

             let region = document.createElement("p");
            region.textContent = `Region:  ${country.region}`;

            countryList.appendChild(listItem);
            countryList.appendChild(capital);
            countryList.appendChild(region);

            // console.log("Name:", country.name);
            // console.log("Capital:", country.capital);

        });

        return dataCountries;
    } catch (error) {
        console.error("Unknown error:", error);
        throw error;
    };
}

fetchCountries();


const searchButtonI = document.getElementById('searchButton');
const searchRegionI =  document.getElementById('searchRegion');

console.log("button:", searchRegionI);

searchButtonI.addEventListener("click", function(){
      Alerts("filter");
     let region = searchRegionI.value;
    
     console.log("Region:", region);
     console.log("All countries:", dataCountries);

     let filterCountries = dataCountries.filter(function(country) {
        return country.region === region;
     });

     console.log(filterCountries);

});


