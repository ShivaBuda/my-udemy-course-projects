"use strict";
const formEl = document.querySelector(".workout__inputs");
const durationEl = document.querySelector(".workout__duration");
const distanceEl = document.querySelector(".workout__distance");
const cadenceEl = document.querySelector(".workout__cadence");
const elevationEl = document.querySelector(".workout__elevation");
const workoutTypeEl = document.querySelector(".workout__type");

class Workout {
    date = new Date();
    id = Date.now + "".slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; //in km
        this.duration = duration; //min
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calPace();
    }

    calPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const running1 = new Running([39, -12], 6, 30, 150);
const cycling1 = new Cycling([39, -12], 20, 55, 200);

/////////////////////////////////////////////
//APPLICATIOIN ARCHITECTURE

class workoutApp {
    #mapEvent;
    #map;
    #workouts = [];
    constructor() {
        this._getPosition();
        formEl.addEventListener("submit", this._newWorkout.bind(this));

        workoutTypeEl.addEventListener("change", this._toggleElevationField);
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                () => alert("Could not get your position!"),
            );
        }
    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coord = [latitude, longitude];

        this.#map = L.map("map").setView(coord, 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Handling click on map
        this.#map.on("click", this._showForm.bind(this));

        /* {   L.marker([lat, lng])
             .addTo(this.#map)
             .bindPopup(
                  L.popup({
                       maxWidth: 300,
                       minWidth: 50,
                       autoClose: false,
                       closeOnClick: false,
                    }),
                    )
                    .setPopupContent("My workout")
                    .openPopup();
               });*/
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        formEl.classList.remove("hidden");
        distanceEl.focus();
    }

    _newWorkout(e) {
        e.preventDefault();

        // Helper function
        const validInputs = (...inputs) =>
            inputs.every((input) => Number.isFinite(input));
        const isPositive = (...inputs) => inputs.every((input) => input > 0);

        // Get data from input
        const workoutType = workoutTypeEl.value;
        const distance = +distanceEl.value;
        const duration = +durationEl.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        //create running object
        if (workoutType === "running") {
            const cadence = +cadenceEl.value;

            if (
                !validInputs(distance, duration, cadence) ||
                !isPositive(distance, duration, cadence)
                //  !Number.isFinite(distance) &&
                //  !Number.isFinite(duration) &&
                //  !Number.isFinite(cadence)
            ) {
                return alert("Input have to be positive number!");
            } else {
                workout = new Running([lat, lng], distance, duration, cadence);
            
            }
        }

        //Create cycling object
        if (workoutType === "cycling") {
            const elevation = +elevationEl.value;
            if (
                !validInputs(distance, duration, elevation) ||
                !isPositive(distance, duration)
            ) {
                return alert("Input must have to be positive number! ");
            }else{
               workout = new Cycling([lat,lng],distance,duration,elevation)
            }

            this.#workouts.push(workout);
        }
        //clear input fields
        durationEl.value = distanceEl.value = cadenceEl.value = elevationEl.value="";

        //Render workout on map as marker
        this.renderWorkoutMarker(workout)
        
    }

    _toggleElevationField() {
        elevationEl.closest(".form__row").classList.toggle("hidden__row");
        cadenceEl.closest(".form__row").classList.toggle("hidden__row");
    }

    renderWorkoutMarker(workout){L.marker(workout.coords)
     .addTo(this.#map)
     .bindPopup(
         L.popup({
             maxWidth: 300,
             minWidth: 50,
             autoClose: false,
             closeOnClick: false,
             className: "running__popup",
         }),
     )
     .setPopupContent(workout)
     .openPopup();}
}

const app = new workoutApp();

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         function (position) {
//             console.log(position);
//             console.log(position.coords);
//             const {latitude} = position.coords;
//             const {longitude} = position.coords;
//             const coord = [latitude, longitude];
//             console.log(latitude, longitude);

//             map = L.map("map").setView(coord, 13);

//             L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                 attribution:
//                     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             }).addTo(map);

//             //handling click on map

//             map.on("click", function (mapE) {
//                 this.#mapEvent = mapE;
//                 //   console.log(mapEvent)
//                 const {lat, lng} = mapEvent.latlng;
//                 //   console.log(lat, lng)

//                 L.marker([lat, lng])
//                     .addTo(map)
//                     .bindPopup(
//                         L.popup({
//                             maxWidth: 300,
//                             minWidth: 50,
//                             autoClose: false,
//                             closeOnClick: false,
//                         }),
//                     )
//                     .setPopupContent("My workout")
//                     .openPopup();
//             });
//         },
//         function () {
//             alert("Could not get your position!");
//         },
//     );
// }
