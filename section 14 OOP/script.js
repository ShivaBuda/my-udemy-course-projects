/* Fundametal principles:-
1. Abstraction -> Ignoring or hiding details tha don't matter.
2.Encapsulation -> Keeping properties and methods private inside the class, not accessible from outside the class.
3. Inheritance   ->Making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between calsses. 
4. Polymorphism   -> A child class can overwrite a method it inherited from a parent class. Many faces*/

// Constructor function and new Operator

const Person = function (firstName, lastName) {
    //Instance properties
    this.firstName = firstName;
    this.lastName = lastName;

    //Never do this
    /* this.showMsg = functioni(){
               console.log(`This is not good practice Mr. ${this.firstName}.`)
          } */
};

// 1. New {} is created
// 2. function is called, this= {};
// 3. {} linked to prototype
// 4. function automatcally return {}
const mohan = new Person("Mohan", "Magar");

//Prototypes
Person.prototype.showMsg = function () {
    console.log(`This is not good practice Mr. ${this.firstName}.`);
};
mohan.showMsg();

// static method
Person.greet = function(){
 console.log("Namaste")
};

Person.greet();

const Student = function(firstName, birthYear, course){
     Person.call(this, firstName, birthYear);
     this.course = course;
}
//Linking prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function(){
     console.log(`My name is ${this.firstName} and I study ${this.course}`)
}


const studentA = new Student("Ram Magar", 1989, "CS");


// Coding Challenge #1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

const car1 = new Car("BMW", 120);
const car2 = new Car("Toyota", 100);

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed}km/h.`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`Braking....${this.speed} `);
};

car1.accelerate();
car2.brake();

//Coding Challenge #2
class CarA {
     constructor(make, speed){
          this.make= make;
          this.speed = speed;
     }
     accelerate(){
          this.speed += 10;
          console.log(`${this.make} going at ${this.speed}km/h.`)
     }
     brake(){
          this.speed -= 5;
          console.log(`Braking....${this.speed} `);
          return this
     }
     get speedUS(){
          console.log(`${this.make} in USA is ${this.speed*1.6}km/h`)
     }

     set speedUS(speed){
          this.speed = speed / 1.6;
     }
}

// Coding Challenge #3
const EV =function(make, speed, charge){
     Car.call(this, make, speed);
     this.charge = charge;
}

EV.prototype.chargeBattery= function(chargeTo){
     this.charge = chargeTo;
     return this
}

EV.prototype.accelerate = function () {
     this.speed += 20;
     this.charge--
     console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.charge}`);
     return this
 };


EV.prototype = Object.create(Car.prototype);
const carB= new EV("Tesla ES2023", 120, 22);

carB.accelerate();

//Coding Challenge #4
class EVCl extends Car {
     #charge;
     constructor(make,speed, charge){
          super(make,speed);
          this.#charge= charge;
     }

     accelerate(){
          this.speed += 20;
          this.#charge --;
          console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.#charge}`);
          return this
     }

     brake(){
          this.speed -= 5;
          console.log(`Braking....${this.speed} `);
          return this
     }
}

const carC = new EVCl("Nissan", 80, 90);
carC.accelerate().brake()


// ES6 Classes
// classes are not hoisted
// class are first-class citizens
// classes are executed in strict mode

// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    // Methods will be add to prototype property
    calAge() {
        console.log(`2023 - ${this.birthYear} years old.`);
    }

    get age() {
        return 2023 - this.birthYear;
    }

    set fullNameCheck(name) {
        if (name.includes(" ")) {
            this.fullName = name;
        } else {
            console.log(`Please enter full name`);
        }
    }

    get fullNameCheck() {
        return this.fullName;
    }

    //static method
    static greeting(){
     console.log("Namaste Hajur")
    }
}

const person1 = new PersonCl("Kaila", 1990);

//Enheritance between "Classes"
class Staff extends PersonCl{
     constructor(fullName, birthYear, course){
          super(fullName, birthYear)
          this.course = course;
     }

     introduce(){
          console.log(`My name is ${this.fullName} and I study ${this.course}`)
     }
}

const staff1 = new Staff ("Maile Rai", 1993, "Science");
staff1.introduce();


// getter and setter

const account = {
    owner: "Shivjee",
    movements: [20, -30, 40, 60],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.latest);
console.log(account.latest=40);

// Another Example
// Encapsulation: Private class fields and methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods

class Account {
     // 1) Public fields
     locale = navigator.language;

     //Private fields (instances)
     #movements = [];
     #pin;

     constructor(owner, currency, pin){
          this.owner = owner;
          this.currency= currency;
          this.#pin = pin;
          //protected property
          // this._pin = pin;
          // this._movements = [];
     }

// 4) Private methods
     #approveLoan(){
          return true
     }
     // _approveLoan(){
     //      return true
     // }
//public interface
     deposit(mov){
          this.#movements.push(mov)
          return this
     }

     widthdrwal(mov){
          this.deposit(-mov)
          return this
     }
}

const acc1 = new Account("Putali Thapa", "SGD", 2233);
acc1.deposit(300);
acc1.widthdrwal(100);

// Chaining
acc1.deposit(222).deposit(333).widthdrwal(20).deposit(20)
