
import { readFile } from "node:fs/promises";

interface Country {
  name: string;
  capital: string;
  region: string;
  area: number;
}

function fetchDataCountries(): Promise<Country[]> {
  return readFile(new URL("../data.json", import.meta.url), "utf-8")
    .then((response: string) => {
      
      const dataCountries: Country[] = JSON.parse(response);

      console.log("Data Countries:", dataCountries);

      dataCountries.forEach((country) => {
        console.log("Name:", country.name);
        console.log("Capital:", country.capital);
        console.log("Region:", country.region);
        console.log("Area:", country.area);
        console.log("--------------------");
      });

      return dataCountries;
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("Error getting country data:", error.message);
      } else {
        console.error("Unknown error:", error);
      }

      throw error;
    });
}

fetchDataCountries();
 



