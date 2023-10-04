document.addEventListener("DOMContentLoaded", async function () {
  const apiUrl = "https://restcountries.com/v3.1/all";

  const searchInput = document.querySelector('input[type="text"]');
  const regionSelect = document.querySelector("#region");

  let countries = [];

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      countries = await response.json();
      renderCountries(countries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function createCountryCard(country) {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    const countryFlag = document.createElement("img");
    countryFlag.classList.add("country-flag");
    countryFlag.src = country.flags.svg;
    countryFlag.alt = `${country.name.common}'s flag`;

    const countryDetails = document.createElement("div");
    countryDetails.classList.add("country-details");

    const countryName = document.createElement("h3");
    countryName.classList.add("country-name");
    countryName.textContent = country.name.common;

    const countryPopulation = document.createElement("p");
    countryPopulation.classList.add("country-population");
    countryPopulation.innerHTML = `<span class="label">Population:</span> ${country.population}`;

    const countryRegion = document.createElement("p");
    countryRegion.classList.add("country-region");
    countryRegion.innerHTML = `<span class="label">Region:</span> ${country.region}`;

    const countryCapital = document.createElement("p");
    countryCapital.classList.add("country-capital");
    countryCapital.innerHTML = `<span class="label">Capital:</span> ${country.capital}`;

    countryDetails.appendChild(countryName);
    countryDetails.appendChild(countryPopulation);
    countryDetails.appendChild(countryRegion);
    countryDetails.appendChild(countryCapital);

    countryCard.appendChild(countryFlag);
    countryCard.appendChild(countryDetails);

    return countryCard;
  }

  function renderCountries(filteredCountries) {
    const countriesContainer = document.querySelector(".countriesContainer");
    countriesContainer.innerHTML = "";

    if (filteredCountries.length === 0) {
      countriesContainer.textContent = "No countries to display.";
    } else {
      filteredCountries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      filteredCountries.forEach((country) => {
        const countryCard = createCountryCard(country);
        countriesContainer.appendChild(countryCard);
      });
    }
  }

  fetchData();

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTerm);
    });
    renderCountries(filteredCountries);
  });

  regionSelect.addEventListener("change", function () {
    const selectedRegion = this.value;
    if (selectedRegion === "all") {
      renderCountries(countries);
    } else {
      const filteredCountries = countries.filter((country) => {
        return country.region.toLowerCase() === selectedRegion.toLowerCase();
      });

      renderCountries(filteredCountries);
    }
  });
});
