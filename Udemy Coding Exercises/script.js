"use strick";
document
    .querySelector(".js-bmi__btn")
    .addEventListener("click", () => calculteBMI());
let displayEl = document.querySelector(".js-bmi__display");

const calculteBMI = () => {
    const bmiEl = document.querySelectorAll(".bmi__input");
    let weight = Number(bmiEl[0].value);
    let height = Number(bmiEl[1].value);
    if (weight && height) {
        let BMI = weight / (height * height);
        displayEl.innerHTML = `Your BMI: ${BMI.toFixed(2)}`;
    }
    bmiEl[0].value = "";
    bmiEl[1].value = "";
};

// Challenge #4
const bill = 40;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(tip);

console.log(
    `The bill was S$${bill}, the tip was S$${tip.toFixed(
        2,
    )}, and the total value is S$${bill + tip}`,
);

// Secition 3, Exercise #1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 24);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= avgKoalas * 2) {
        console.log(`Dolphins win ${avgDolphins} Vs. ${avgKoalas}`);
    } else if (avgKoalas >= avgDolphins * 2) {
        console.log(`Koalas win (${avgKoalas} Vs. ${avgDolphins})`);
    } else {
        console.log("No team wins");
    }
}

console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);

//Exercise #2

function calcTip(bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
console.log(calcTip(30));

//Exercise #3

const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = (this.mass / this.height) * this.height;
        return this.bmi;
    },
};

const john = {
    fullName: "John Smith",
    mass: 102,
    height: 1.85,
    calcBMI() {
        return (this.bmi = (this.mass / this.height) * this.height);
    },
};
mark.calcBMI();
john.calcBMI();

console.log(
    `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi}).`,
);

// Exercise #4
const bills = [22, 295, 176, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
function calcTips(billArr) {
    for (let i = 0; i < billArr.length; i++) {
        let bill =
            billArr[i] >= 50 && billArr[i] <= 300
                ? billArr[i] * 0.15 + billArr[i]
                : billArr[i] * 0.2 + billArr[i];
        let billTips =
            billArr[i] >= 50 && billArr[i] <= 300
                ? billArr[i] * 0.15
                : billArr[i] * 0.2;
        tips.push(billTips);
        totals.push(bill);
    }
}
calcTips(bills);
console.log(totals, tips);

//Bonus
function calcAverage2(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

console.log(calcAverage2(bills));

// Section 5 Exercise
const data = [14, 18, 30, 20];

function weatherForcast(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(`...${arr[i]} deg in ${i + 1} days.`);
    }
}

weatherForcast(data);

// Section 9 Challenge #1
const game = {
    team1: "Bayern Munich",
    team2: "Borrussia Dormund",
    players: [
        [
            "Neuer",
            "Pavard",
            "Marginex",
            "Alava",
            "Davies",
            "Kimmich",
            "Goretzka",
            "Coman",
            "Muller",
            "Gnarby",
            "Lewandowski",
        ],
        [
            "Burki",
            "Schulz",
            "Hummels",
            "Akanji",
            "Hakim",
            "Weigl",
            "Witsel",
            "Hazard",
            "Brandt",
            "Sancho",
            "Gotze",
        ],
    ],
    score: "4:0",
    scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
    date: "Not 9th 2023",
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

const [players1, players2] = game.players;
console.log(players1);
const [gk, ...fieldPlayer] = players1;
console.log(gk, fieldPlayer);
// const allPlayers =[...game["players"][0], ...game["players"][1]];
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const finalPlayers = [...players1, "Thiago", "Coutinho", "Periscic"];

const {
    odds: {team1, x: draw, team2},
} = game;
console.log(team1, draw, team2);

// Coding Challenge #2
for (let i = 0; i < game.scored.length; i++) {
    console.log(`Goal ${i + 1}: ${game.scored[i]}`);
}

for (const [i, el] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${el}`);
}

const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) {
    average += odd;
}
average /= odds.length;
console.log(average);

for (const [key, value] of Object.entries(game.odds)) {
    const teamStr = key === "x" ? "draw" : `Victory ${game[key]}`;
    console.log(`Odd of ${teamStr} is ${value}`);
}

//Coding challenge #3
const gameEvents = new Map([
    [17, "Goal"],
    [36, "Substitution"],
    [47, "Goal"],
    [61, "Substitution"],
    [64, "Yellow Card"],
    [69, "Red Card"],
    [70, "Substitution"],
    [72, "Substitution"],
    [76, "Goal"],
    [80, "Goal"],
    [92, "Yellow Card"],
]);

// Coding challenge #4

/*under_case
first_name
Some_Various
calculate_AGE
delayed_departure */

document.querySelector(".btn").addEventListener("click", textFormat);

function textFormat() {
    const inputValue = document.querySelector(".textarea").value;

    /* if(inputValue.includes("_")){
    let newText =inputValue.toLowerCase().split("_");
    let word_2= (newText[1], newText[1][0].toUpperCase() + newText[1].slice(1))
    newText[1] = word_2
    console.log(newText.join(""))
    }*/

    const arr = inputValue.toLowerCase().split("\n");
    // const newArr = []

    /*for(let word of arr){
        word = word.split('_')
        two = word[1].replace(word[1][0], word[1][0].toUpperCase() )
        word[1]= two
        word = word.join("")
        newArr.push(word)
    }
    console.log(newArr.join("\n"))*/

    for (const [i, el] of arr.entries()) {
        const [first, second] = el.split("_");
        const output = `${first}${second.replace(
            second[0],
            second[0].toUpperCase(),
        )}`;
        console.log(`${output.padEnd(20)}${"*".repeat(i + 1)}`);
    }
}

//Section 11 coding challenge #1
const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 9, 3, 7];

const checkDogs = function (juliaDog, kateDog) {
    const juliaArr = juliaDog.splice(1, 2);

    const allDogs = [...juliaArr, ...kateDog];
    allDogs.forEach((dog, i) => {
        dog >= 3
            ? console.log(
                  `Dog number ${i + 1} is adult, and is ${dog} years old`,
              )
            : console.log(
                  `Dog number ${
                      i + 1
                  } is still a puppy and is ${dog} years old`,
              );
    });
};
checkDogs(julia, kate);

//Challenge #2 ***********
function calcAverageHumanAge(dogAge) {
    const humanAge = dogAge.map((age) => {
        if (age <= 2) {
            return 2 * age;
        } else if (age > 2) {
            return 16 + age * 4;
        }
    });
    console.log(humanAge);
    const oldHumanAge = humanAge.filter((value) => value > 18);
    console.log(oldHumanAge);
    const averageHumanAge = oldHumanAge.reduce(
        (accu, value) => accu + value,
        0,
    );
    return averageHumanAge / oldHumanAge.length;
}

console.log(calcAverageHumanAge(kate));

//Coding challenge #3
function calcAverageHumanAge2(dogAge) {
    const humanAge = dogAge
        .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter((age) => age > 18)
        .reduce((accu, value, i, arr) => accu+value/arr.length, 0);
        
    console.log(humanAge);
}

calcAverageHumanAge2(kate);
