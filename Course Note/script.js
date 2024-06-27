"use strict";
//Section 9 ###############
const openingHours= {
     Thu: {
         open: 12,
         close: 22,
     },
     fri: {
         open: 11,
         close: 23,
     },
     Sat: {
         open: 0,
         close: 24,
     },
 }

const restaurent = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
    starterMenu: ["Foccacia", "Bruschetta", "Garlic", "Bread", "Capress Salad"],
    maniMenu: ["Pizza", "Pasta", "Risotto"],

    //ES6 enhanced object literals
    openingHours,

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.maniMenu[mainIndex]];
    },

    orderDelivery: function({starterIndex = 1, mainIndex = 1, time = "22:00", address}){
     console.log(`Oreder received! ${this.maniMenu[mainIndex]} ${this.starterMenu[starterIndex]} will be delivered to ${address} at ${time}`)
    },
    numGuests: 0
};

// Array Destructuring
const [pizz1, pizza2, pizza3, pizza4] = restaurent.categories;
let [pizzaFirst, , , pizzaLast] = restaurent.categories; // to skip items;

// switching variables
[pizzaFirst, pizzaLast] = [pizzaLast, pizzaFirst];

//function returning 2 values
const [starter, mainCourse] = restaurent.order(2, 0);

// nested Arrays
const alphabet = ["a", "b", "c", ["d", "e", "f"]];
const [alpha, bravo, charlie, [delta, echo, foxtort]] = alphabet;

// Default Values
const [g = 1, h = 2, i = 3] = [8];

//Object destructuring ####################
const {name, categories} = restaurent;
console.log(name, categories);
// rename keys
const {
    name: restaurentName,
    openingHours: hours,
    categories: tags,
} = restaurent;
// Default value
const {menu = [], starterMenu: starters = []} = restaurent;

// Mutating varibles
let a = 11;
let b = 12;
const obj = {a: 33, b: 44, c: 55};
({a, b} = obj);

//Nested Objects
const {
    fri: {open, close},
} = restaurent.openingHours;

// Object as argument
restaurent.orderDelivery({
     time: "22:30",
     address: "Joo Seng Road",
     mainIndex: 2,
     starterIndex: 2,
})

//Spread Operator #######################
const arrOne = [1, 2, 3];
const arrTwo = [4, 5, 6];
//Joining arrays
const arrNew = ['a', 'b', ...arrOne, ...arrTwo];
const newMenu =[...restaurent.starterMenu, ...restaurent.maniMenu];

//Copy array
const arrOneCopy = [...arrOne];

// getting individual items
console.log(...arrOne);

// Passing array in function
// restaurent.order(...newMenu);

//Objects
const newRestaurent = {
     established: 1980, ...restaurent, founder: "Shiva"
}

// Copy obj
const newRestaurentCopy = {...newRestaurent};

// Rest Pattern and Parameters #############
const [ab, bc, ...others] = [1, 2, 3, 4, 5, 6];
const [pizza, , resotto, ...otherFood]= [...restaurent.maniMenu, ...restaurent.starterMenu];

//Object 
const {sat, ...weekdays} = restaurent.openingHours;

// Functions
function add (...numbers){
     console.log(numbers)
}

add(2,3,4,5);
add(...arrOne);

function orderFood(menu1, ...othersMenus){
     console.log(menu1, othersMenus)
}
orderFood("momo", "mee", "chaumin", "sukuti");

//Short Circuiting(&&  and ||)########################
3 || "Shiva";      // 3
"" || "Shiva";     //Shiva
true || 0;         //true
undefined || null  //null
undefined||0||""||"hello"||55 // hello

//Nullish Coalescing Operator (??)  Note:: Nullish: null and undefined (NOT: 0 or " ")
restaurent.numGuests = 0;
const guests = restaurent.numGuests ?? 10;

3 && "Shiva";      // Shiva
"" && "Shiva";     //""
true && 0;         //0
undefined && null  //undefined

//Logical assignment operator
const rest1 ={
     name: "Capri",
     numGuests : 20,
}
//OR assignment operator
rest1.numGuests = rest1.numGuests || 10; 
// or
rest1.numGuests ||= 10

//nullish assignment operator(null or undefined)
rest1.numGuests ??= 10;

//AND assignment operator
rest1.owner &&= "<ANONYMOUS";

//Looping Arrays --> for-of-loop; ###########################

const allPlayers = ["player1", "player2", "player3", 'player4']
for(const player of allPlayers){
     console.log(player)
 }

 
  for (const [i, el] of allPlayers.entries()){
           console.log(`${i}: ${el}`) }

 // Optional Chaining ############
 const days = ["Mon", "Tue", "Thu", "Fri", "Sat"];
 restaurent.openingHours.mon?.open;
 restaurent.openingHours?.mon?.open;

 for(const day of days){
     const open = restaurent.openingHours[day]?.open ?? "Closed";
     console.log(`On ${day}, we open at ${open}`)
 };

 //Methods
 restaurent.order?.(0, 1)?? "Method does not exist!";

//  Arrays
const users =[{name: "Shiva", email: "mayalu@gmail.com"}];

if(users.length >0){
     console.log(users[0].name)
}else{
     "User array is empty"
};
users[0]?.name?? "Users array empty"

//Looping Objects: Object keys, Values, and Entries
//Property NAMES
const properties= Object.keys(openingHours); //return a array of KEYS of object.

for(const key of Object.keys(rest1)){
     console.log(key)
}

const values = Object.values(openingHours); //return values of object

for(const [key, value] of Object.entries(openingHours)){  // --> to  destructur value {open, close}
     console.log(key, value)
}

//Sets ################### remove dublicate, only unique value, high performance
const mySet = new Set(["maya", "china", "love", "love", "maya"]);
console.log(mySet)
console.log(mySet.size)
console.log(mySet.has("maya"));
mySet.add("rumal");
mySet.delete("china");
// mySet.clear()

// looping sets
for(const set of mySet) console.log(set);

// converting to array
const staff = ['Waiter', "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set (staff)];
console.log(staffUnique)

//Maps #####################
const rest = new Map();
rest.set("name", "Nepalganja");
rest.set(1, "Fries, Burger");
rest.set("veg", ["tomato", "potato", "garlic"]);
rest.set("open", 12);
rest.set("treu", "We are open");
rest.set(false, "We are closed")

console.log(rest.get("name"));

rest.has("veg");
rest.delete(1);
// rest.clear()

const question = new Map([
     ['question', "What is the best programming language in the world?"],
     [1, "Python"],
     [2, "Java"],
     [3, "Ruby"],
     ["correct", 3],
     [true, "Correct"],
     [false, "Try again"]    
]);
// converting object to map
const operatingHours= new Map (Object.entries(openingHours));
console.log(operatingHours)

//quiz app
console.log(question.get("question"));
for(const [key, value] of question){
     if(typeof key === 'number') console.log(`Answer ${key}: ${value}`)
}

let answer = 3;
console.log(question.get(question.get("correct")=== answer));

//Converting map to array
console.log([...question]);


// String ###########################
const myFullName = "Maila Bahadur Budha Magar";
myFullName[0];
"Nepalese"[3];
"Nepalese".length;
myFullName.length;
myFullName.indexOf("o");
myFullName.lastIndexOf("a");

myFullName.slice(2) // index 2 to End
myFullName.slice(1, 5) // start and stop
myFullName.slice(0, myFullName.indexOf(" "));
myFullName.slice(myFullName.lastIndexOf(" ", -1));
myFullName.slice(-5);

function checkSeat(seat){
     const s = seat.slice(-1);
     if(s === 'B' && s === "E"){
          "You got middle seat"
     }else{
          "You got window seat"
     }
}

myFullName.toLowerCase();

// capitalizing
const staffName = "moHan";
let staffNameCap =staffName.toLowerCase();
staffNameCap= staffNameCap[0].toUpperCase() + staffNameCap.slice(1);
console.log(staffNameCap);

const myEmail = "nePaleseGuy@hotmail.Com ";
const myCorrectEmail = myEmail.toLowerCase().trim();
console.log(" Brown  ".trimStart());
console.log("Good  ".trimEnd());

const stallName= "Makan.place";
const stallName_Correct = stallName.replace(".", " ");
console.log(stallName_Correct);

console.log("mayalu timilai".replaceAll("a", "aa"));

//Booleans
"foolthungeraani".includes("thu");
"MagarMeeja".startsWith("ma");
"magarmeeja".endsWith("ja");

// string exercise
function checkBaggage(items){
     const baggage  =items.toLowerCase();
     if(baggage.includes("drugs") || baggage.includes("toy gun")){
          console.log("You are not allowed to carry these items")
     }else{
          console.log("Welcom aboard")
     }
}

checkBaggage("Pencil, Camera, toy gun, food, drugs");

//Split and join
console.log("a+b+c+d+e+f+i".split("+"))
console.log("Bomkaji Magar".split(" "));

const [firstName, lastName]= "Kalu Pandey".split(" ");

const tutorName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(tutorName)

function capitalizingSentence(sentence){
     let capName = []
     sentence = sentence.split(" ")
     for(const word of sentence){
          // capName.push(word[0].toUpperCase() + word.slice(1))
          capName.push(word[0].replace(word[0], word[0].toUpperCase()))
     }
     console.log(capName.join(" "))
}

capitalizingSentence("man bahadur budathoki magar");

//Padding
console.log("Game".padStart(10, "+"));
console.log("Over".padEnd(10, "+"));

const fin = "F1234567810T"
let finCoded = fin.slice(-3);
console.log(finCoded)
console.log(finCoded.padStart(fin.length, "*"))

//String method practice
const flight= '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';






 



