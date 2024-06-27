const account1 = {
    owner: "Shiv Bhai",
    movement: [100, -500, 4000, 100, -45, -34, 60, -100, 800],
    interestRate: 1.2,
    pin: 1111,
};
const account2 = {
    owner: "Kale Dai",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 1.2,
    pin: 2222,
};
const account3 = {
    owner: "Fuchche Keta",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 1.2,
    pin: 3333,
};
const account4 = {
    owner: "Tamane Kanchha",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 1.2,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const welcomeHeadingEl = document.querySelector(".login__heading");
const userEl = document.querySelector(".user");
const pinEl = document.querySelector(".pin");
const mainPageEl = document.querySelector(".main__page");
const movementEl = document.querySelector(".movement__display");
const balanceEl = document.querySelector(".balance__amount");
const amountInEl = document.querySelector(".amount__in");
const amountOutEl = document.querySelector(".amount__out");
const interestEl = document.querySelector(".amount__interest");
const transferEl = document.querySelector(".transfer__input-amount");
const transferToAccountEl = document.querySelector(".transfer__toAccount");
const closeUserEl = document.querySelector(".close__user");
const closePinEl = document.querySelector(".close__pin");
const loanInputEl = document.querySelector(".loan__input");


// Login
let currentAccount;
document.querySelector(".login").addEventListener("click", (e) => {
    e.preventDefault();

    currentAccount = accounts.find((acc) => acc.userName === userEl.value);
    if (currentAccount?.pin === +pinEl.value) {
        welcomeHeadingEl.textContent = `Welcome back, ${
            currentAccount.owner.split(" ")[0]
        }`;
        //display UI
        mainPageEl.style.opacity = 1;
        //Show balance
        calcBalance(currentAccount);
        // Transaction history
        transactionHistory(currentAccount.movement);
        //Show summary
        calcSummaryIn(currentAccount.movement);

        // clear user and pin
        userEl.value = pinEl.value = "";
        pinEl.blur();
    }
});

// Transfer
document.querySelector(".transfer__btn").addEventListener("click", (e) => {
    e.preventDefault();
    const amount = +transferEl.value;
    const receiverAcc = accounts.find(
        (acc) => acc.userName === transferToAccountEl.value,
    );
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.userName !== currentAccount.userName
    ) {
        currentAccount.movement.push(-amount);
        receiverAcc.movement.push(amount);

        updateUI(currentAccount);
    }
    transferEl.value = transferToAccountEl.value = "";
});
//Loan ********************
document.querySelector(".loan__btn").addEventListener("click", (e) => {
    e.preventDefault();
    const loan = +loanInputEl.value;
    // const balance = calcBalance(currentAccount)
    if (loan > 0 && currentAccount.movements.some((mov) => mov >= loan * 0.1)) {
        currentAccount.movements.push(loan);
    }
});

//Close **************
document.querySelector(".close__btn").addEventListener("click", (e) => {
    e.preventDefault();
    const user = closeUserEl.value;
    const pin = +closePinEl.value;
    closeUserEl.value = closePinEl.value = "";
    if (currentAccount.userName === user && currentAccount.pin === pin) {
        const index = accounts.findIndex(
            (acc) => acc.userName === currentAccount.userName,
        );
        accounts.splice(index, 1);
        mainPageEl.style.opacity = 0;

        console.log(index);
    }
});

//SORT
let sorted = false;
document.querySelector(".sort").addEventListener("click", ()=>
{transactionHistory(currentAccount.movement, !sorted)
     sorted = !sorted;
     // updateUI(currentAccount)
     console.log("Sorted")
});

function updateUI(acc) {
    //Show balance
    calcBalance(acc);
    // Transaction history
    transactionHistory(acc.movement);
    //Show summary
    calcSummaryIn(acc.movement);
}

const transactionHistory = function (movement, sort = false) {
     movementEl.innerHTML = "";

     const movs= sort?movement.slice().sort((a,b)=> a-b): movement;

    movs.forEach((value, i) => {
        const transType = value > 0 ? "Deposit" : "Withdrawl";
        const html = `
      <div class="movement__items">
           <p class="deposit">${i + 1} ${transType}</p>
           <p class="ammount">${value}</p>
      </div>
      `;
        movementEl.insertAdjacentHTML("afterbegin", html);
    });
};

function createUserName(accs) {
    accs.forEach((acc) => {
        acc.userName = acc.owner
            .split(" ")
            .map((value) => value[0])
            .join("")
            .toLowerCase();
    });
}
createUserName(accounts);

function calcBalance(acc) {
    acc.balance = acc.movement.reduce((accu, value) => accu + value, 0);
    balanceEl.textContent = `SGD ${acc.balance}`;
}

function calcSummaryIn(movement) {
    const inSummary = movement
        .filter((value) => value > 0)
        .reduce((accu, value) => accu + value, 0);
    amountInEl.textContent = `S$${inSummary}`;

    const outSummary = movement
        .filter((value) => value < 0)
        .reduce((accu, value) => accu + value, 0);
    amountOutEl.textContent = `S$${Math.abs(outSummary)}`;

    const interest = movement
        .filter((deposit) => deposit > 0)
        .map((deposit) => (deposit * 1.5) / 100)
        .reduce((accu, value) => accu + value, 0);
    interestEl.textContent = `S$${interest}`;
}
////////////////////////////////////////////////////////////////////////
//###########################################################################

const arr = ["a", "b", "c", "d", "e"];
//SLICE Method does not mutate original array
arr.slice(2); // start to end
arr.slice(-1); // last item of array
arr.slice(2, 3); // start and stop
arr.slice(); // whole array, same as [...arr]

//SPLICE mutate original array
arr.splice(2); // start to end
arr.splice(1, 2); // start and number of items to slice;

// REVERSE mutate original array
const arr2 = ["h", "j", "e", "k", "i"];
arr2.reverse();

//CONCAT does not mutate original array
const letters = arr.concat(arr2); // or letters = [...arr, ...arr2]

// JOIN
console.log(letters.join("-"));

// AT method
arr.at(0); //or arr[0]
arr.at(-1); // last item
console.log("Shivjee".at(-3));

// FOREACH method --> Looping array --> can not use break
const transactions = [23, -89, 40, 34, 87, -7, -0.5];
transactions.forEach((trans, i, arr) => {
    if (trans > 0) {
        console.log(`Trans ${i + 1}: You deposited ${trans}`);
    } else {
        console.log(`Trans ${i + 1}: You withdrawled ${Math.abs(trans)}`);
    }
});

// with MAP and SET
const currencies = new Map([
    ["SGD", "Singapore dollar"],
    ["USD", "United States dollar"],
    ["NRS", "Nepali Rupees"],
]);

const currencyAbrevations = new Set(["SGD", "USD", "EUR", "NRS"]);

currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

currencyAbrevations.forEach((value, _, map) => {
    console.log(`${value}: ${value}`);
});

//#####################
//MAP, FILTER and REDUCE array methods
const posbBank = [230, 400, -60, 20, -20, 30, 50];
const newPosb = posbBank.map((value, i) => {
    return value * (i + 1);
});
console.log(newPosb);

// Map method
const transactions2 = [23, -89, 40, 34, 87, -7, -0.5];
const transSeperated = transactions2.map(
    (value, i) =>
        `Movement ${i + 1}: You ${
            value > 0 ? "Deposited" : "Withdrawl"
        } ${Math.abs(value)}`,
);
console.log(transSeperated);

//FILTER method
const deposit = transactions2.filter((value, index, arr) => value > 0);
console.log(deposit);
const withdrawl = transactions2.filter((value, index, arr) => value < 0);
console.log(withdrawl);

//REDUCE method
const balance = transactions2.reduce((accu, value, i, arr) => accu + value, 0);
console.log(balance);

//Max value with reduce method
const max = transactions2.reduce((accu, value) => {
    if (accu > value) return accu;
    else return value;
});

const userName = "Shiv Jee Buda";
const firstLetter = userName
    .split(" ")
    .map((word) => word[0])
    .join("");
console.log(firstLetter);

// FIND method
console.log(transactions2.find((move) => move < 0));

// console.log(transactions2.find(acc => acc.owner === "Shiv Bhai"));

// **********
//SOME and EVERY method --> return booleans
//Equality
const movements = account1.movement;
console.log(movements.includes(-300));
// Condition
console.log(movements.some((mov) => mov === 200));
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

console.log(movements.every((mov) => mov > 0));

//Separate callback
const moveCondition = (mov) => mov > 0;
console.log(movements.some(moveCondition));
console.log(movements.filter(moveCondition));
console.log(movements.every(moveCondition));

//FLAT and FLATMAP methods
const alphabet = [[1, 2, 3, 4], 5, 6, 7, [8, 9]];
console.log(alphabet.flat());

const nestedDeep = ["a", "b", ["c", "d", ["e", "f", "g"]]];
console.log(nestedDeep.flat(2)); // default 1;

const overalBalance = accounts
    .map((acc) => acc.movement)
    .flat()
    .reduce((accu, value) => accu + value, 0);
console.log(overalBalance);

const overalBalance2 = accounts.flatMap(acc=> acc.movement).reduce((accu, value)=>accu+value, 0);
console.log(overalBalance2);

//SORT method --> mutate array and return reference
const brothers = ["Kale", "Bhale", "Churute", "Ganja", "Bhate"];
console.log(brothers.sort());

const numbers= [34, 12, 11, 89, -3, -34, 23, -22];
//Ascending
numbers.sort((a,b)=> {
     if(a> b) return 1;
     if(a<b) return -1
})

//or
numbers.sort((a,b)=> a-b)

//Descending 
numbers.sort((a,b)=>{
     if(a>b) return -1;
     if(a<b) return 1;
})

// or
numbers.sort((a,b)=> b-a);

//More ways of creating arrays
// EMPTY array and FILL method
console.log(new Array(1,2,3, 4, 5));
const a= new Array(8); // create empty array
console.log(a.fill("*", 3, 5)) // el, start, stop

// ARRAY.FROM
const b= Array.from({length: 4}, ()=>1) // better way
const c= Array.from({length: 5}, (value, i)=> i+1);
console.log(c)

