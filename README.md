**Frontend Mentor – REST Countries API Challenge**

***Frontend Mentor states:***

"This challenge was originally created to use the REST Countries API. Since then, that API has become a PAID service that requires an account, so its old free endpoints NO longer return data. To keep this challenge free and working out of the box, we have included all the country data in a data.json file for you to use instead."

The Frontend Mentor – REST Countries API challenge was implemented in two versions.

**VERSION A: Using the Local JSON File**

1. The application uses fetch("./data.json") directly to retrieve the country data.
2. To test and verify that the application works correctly, the following files and configurations must be used:

    Use dataCountriesDataJSON.js and countryInfoDataJSON.js.
    In index.html, reference src="./dataCountriesDataJSON.js".
    In countryInfo.html, reference src="./countryInfoDataJSON.js".
3. The application was deployed to Netlify using the following domain:

https://rest-countries-datajson.netlify.app/

**VERSION B: Using an External API**

1. An API with the same data structure as the original data.json file was searched for, but none was found. Therefore, an API containing the country information required for the challenge, but with a different data structure, was used instead. The data was retrieved and adapted to meet the project's requirements.

One issue was identified with the country of Abkhazia, for which the flag image was unavailable. As a result, the application displays an "Image not available" message.

2. The API used was:

https://api.restcountries.com/countries/v5

The API occasionally loses its connection and returns data for only 100 countries at a time (offset += 100;). When attempting to retrieve all the country data using offset += result.data.meta.limit;, the application encounters errors.

3. To run this version of the application, the following files and configurations must be used:

    Use dataCountries.js and countryInfo.js.
    In index.html, reference src="./dataCountries.js".
    In countryInfo.html, reference src="./countryInfo.js".
4. An API key was requested and obtained. The key was not uploaded to GitHub.
The application was deployed to Netlify using the following domain:

https://rest-countries-apiv5.netlify.app/

Before deployment, the domain rest-countries-apiv5.netlify.app had to be added to the CORS Allowed Origins section at https://restcountries.com/api-keys. Otherwise, the application would not display the country information.

5. If the API encounters an error, screenshots of the application are available in the project's \restCountriesAPI\designTestWithAPI folder.