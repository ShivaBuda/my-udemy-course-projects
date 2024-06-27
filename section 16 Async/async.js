const btnEl = document.querySelector(".btn__country");
const countriesContainer = document.querySelector(".countries");

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

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

const whereAmI = async function(){
     const pos = await getPosition();
     const{latitued: lat, langitude: lng} = pos.coords;

     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
     const dataGeo = await resGeo.jason();

     const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
     const data =  await res.json();
     
     renderCountry(data[0])
}

whereAmI();

