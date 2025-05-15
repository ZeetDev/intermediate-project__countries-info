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
			.then(([country]) => {
				console.log(country);
				const countryImage = document.querySelector("#country-image");
				const Image = document.createElement("img");
				Image.src = country?.flags?.svg;
				Image.alt = country?.name?.common;
				Image.className = "h-full w-full object-cover object-center";
				countryImage?.appendChild(Image);

				const countryInfo = document.querySelector<HTMLDivElement>("#country-info");
				const infoCard = document.createElement("div");
				infoCard.innerHTML = `
				   <h1 class="text-3xl font-bold mb-6">${country?.name?.common}</h1>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            <!-- Left Column -->
                            <div>
                                <div class="mb-4 flex gap-3 flex-col items-start">
                                    <p>Native Name:</p>
                                    <ul class="font-bold" id="native-name"></ul>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Population:</p>
                                    <p class="font-bold">${country?.population.toLocaleString("en-IN")}</p>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Region:</p>
                                    <p class="font-bold">${country?.region}</p>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Sub Region:</p>
                                    <p class="font-bold">${country?.subregion}</p>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Capital:</p>
                                    <p class="font-bold">${[...country.capital]}</p>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div>
                                <div class="mb-4 flex items-center gap-3">
                                    <p>Top Level Domain:</p>
                                    <p class="font-bold">.be</p>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Currencies:</p>
                                    <p class="font-bold">Euro</p>
                                </div>

                                <div class="mb-4 flex items-center gap-3">
                                    <p>Languages:</p>
                                    <p class="font-bold">Dutch, French, German</p>
                                </div>
                            </div>
                        </div>

                        <!-- Border Countries -->
                        <div class="mt-8">
                            <div class="flex flex-wrap items-center">
                                <p class="font-medium mr-4">Border Countries:</p>
                                <div class="flex flex-wrap gap-2 mt-2 md:mt-0">
                                    <span class="px-4 py-1 border dark:border-white border-neutral-950 text-sm rounded"
                                        >France</span
                                    >
                                    <span class="px-4 py-1 border dark:border-white border-neutral-950 text-sm rounded"
                                        >Germany</span
                                    >
                                    <span class="px-4 py-1 border dark:border-white border-neutral-950 text-sm rounded"
                                        >Netherlands</span
                                    >
                                </div>
                            </div>
                        </div>
				`;
				countryInfo?.appendChild(infoCard);
				const nativeNames = infoCard.querySelector("#native-name");
				for (const nName in country?.name?.nativeName) {
					console.log(nName, "😨 ");
					const liTag = document.createElement("li");
					liTag.innerHTML = `<li><span class="font-normal uppercase">${nName}</span> :- ${country?.name?.nativeName[nName]?.official}</li>`;
					nativeNames?.appendChild(liTag);
				}
			});
	}

	displaySingleCountryData();
});
