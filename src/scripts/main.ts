// packages
import "iconify-icon";

// styles
import "../styles/style.css";

// scripts
import "./theme-mode.ts";
import type { Country } from "./types/countries.ts";

// main code

document.addEventListener("DOMContentLoaded", () => {
	const countriesList = document.querySelector("#countries-list");

	// fetch countries data from api
	fetch("https://restcountries.com/v3.1/all")
		.then((res) => res.json())
		.then((data) => {
			displayCountriesData(data);
		});

	function displayCountriesData(countries: Country[]): void {
		// Create a document fragment to hold the country card
		for (const country of countries) {
			const countryCard = document.createElement("a");
			countryCard.className = "bg-white dark:bg-gray-800 shadow rounded overflow-hidden";
			countryCard.href = `/country.html?name=${country?.name?.common}`;
			countryCard.innerHTML = `
			        <img src="${country?.flags?.svg}" alt="Germany" class="w-full h-40 object-cover" />
			        <div class="p-4">
			            <h2 class="text-lg  mb-2 font-bold truncate">${country?.name?.common}</h2>
			            <p><strong>Population:</strong> ${country?.population.toLocaleString("en-IN")}</p>
			            <p><strong>Region:</strong> ${country?.region}</p>
			            <p><strong>Capital:</strong> ${country.capital}</p>
			        </div>
			`;
			countriesList?.appendChild(countryCard);
		}
	}

	// print single country data
	function displaySingleCountryData() {
		const countryName = new URLSearchParams(location.search).get("name");
		fetch(`https://restcountries.com/v3.1/name/${countryName}`)
			.then((res) => res.json())
			.then((data) => {
				const singleCountryName = document?.querySelector("#single-country-name");
				if (singleCountryName) {
					singleCountryName.innerHTML = `<span>${data[0]?.name?.common}</span>`;
				}
			});
	}

	displaySingleCountryData();
});
