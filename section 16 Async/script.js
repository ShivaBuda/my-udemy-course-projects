"use strict";
const btnEl = document.querySelector(".btn__country");
const countriesContainer = document.querySelector(".countries");

/*const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `<article class="country">
          <img src="${
              data.flags.png
          }" alt="country flag" class="country__img" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__retion">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
          ).toFixed(1)} people</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
     </div>
     </article>`;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
};

getCountryData("nepal");
getCountryData("singapore");
getCountryData("usa");
*/

const renderCountry = function (data) {
    const html = `<article class="country">
          <img src="${
              data.flags.png
          }" alt="country flag" class="country__img" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__retion">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
          ).toFixed(1)} people</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
     </div>
     </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMsg = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

        return response.json();
    });
};

const getNeighbour = function (neighbour) {
    if (!neighbour) throw new Error("This country has no neighbour!");

    return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found",
    ).then((data) =>
        // console.log(data)
        renderCountry(data),
    );
    // console.log(neighbour);
};

const getCountryData2 = function (country) {
    getJSON(
        `https://restcountries.com/v2/name/${country}`,
        "Country not found!",
    ).then((data) => {
        console.log(data[0].borders);
        renderCountry(data[0]);

        const neighbour = data[0].borders[0];

        return getNeighbour(neighbour);
    });
};

getCountryData2("nepal");

//////////////////////////////////////////
// Coding Challenge #1
const getGeoData = function (url) {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error("Country not found");
        return response.json();
    });
};
const whereAmI = function (lat, lng) {
    getGeoData(`https://geocode.xyz/${lat},${lng}?geoit=json`).then((data) =>
        console.log(`You are in ${data.city}, ${data.country} `),
    ).catch("No country found");
};

whereAmI(-33.933, 18.474);
