const Potion = require('../lib/Potion');
const Character = require('./Character');

//function Player(name = '') {

class Player extends Character{
  constructor(name = '') {
   // call parent constructor here: which is Character
  super(name);

  // this.name = name;
  // this.health = Math.floor(Math.random() * 10 + 95);
  // this.strength = Math.floor(Math.random() * 5 + 7);
  // this.agility = Math.floor(Math.random() * 5 + 7);
  this.inventory = [new Potion('health'), new Potion()];
  }

  // inherit prototype methods from Character here:
  //Player.prototype = Object.create (Character.prototype);

  // returns an object with various player properties
    //When using prototype, instead of 'this' you are only creating the method once on the constructor itself for all the player
    //New player objects simply inherit the method from the constructor 
    //Player.prototype.getStats = function() {

      getStats() {
        return {
          potions: this.inventory.length,
          health: this.health,
          strength: this.strength,
          agility: this.agility
        };
      }
  
    // returns the inventory array or false if empty
    //Player.prototype.getInventory = function() {

      getInventory() {
      if (this.inventory.length) {
        return this.inventory;
      }
      return false;
    }
  

// Player.prototype.getHealth = function () {
//   return `${this.name}'s health is now ${this.health}!`;
// }
// Player.prototype.isAlive = function () {
// if (this.health === 0) {
//   return false;
// }
//   return true;
// };

// Player.prototype.reduceHealth = function(health) {
//   this.health -= health;
//   if (this.health < 0) {
//     this.health = 0;
//   }
// };

// Player.prototype.getAttackValue = function () {
//   const min = this.strength -5;
//   const max = this.strength +5;
//   return Math.floor(Math.random()* (max - min) + min); // (15-5) + 5
// };

//Player.prototype.addPotion = function(potion) {

addPotion(potion) {
  this.inventory.push(potion);
};

//we are keeping track of the old inventory length so that we can make sure the length decreases and doesn't go below zero.
//The .splice() method removes items from an array and returns the removed item(s) as a new array.
//two things are happening here: the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array, then the Potion at index [0] of this "removed items" array is saved in a potion variable.

//Player.prototype.usePotion = function(index) {

  usePotion(index) {
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
      break;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;
    }
  }
}



module.exports = Player;












// Incidentally, these are the other three principles of OOP:

//Inheritance

// Encapsulation: Objects can privatize some of their data and only expose them through public methods like getName().

// Abstraction: Object methods are easy to use without needing to understand their complex inner workings. For example, playGame() does what you'd expect it to without knowing about the 100 other methods it might call internally.

// Polymorphism: Objects (and their methods) can change depending on the context. For example, the Car and Plane objects might inherit from Vehicle, but their move() methods are very different.
//=======================================================
// In ES6, constructor functions can be written using the class keyword, as shown in the following code:

// class Car {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   honk() {
//     console.log('beep beep');
//   }
// }
//==============================================================

// Note that the class syntax accomplishes the same thing that a normal constructor function would, as you can see in the following code:

// function Car(make, model) {
//   this.make = make;
//   this.model = model;
// }

// Car.prototype.honk = function() {
//   console.log('beep bee');
// };

// const car = new Car('Honda', 'Civic');
// car.honk();


// // car objects are still created and used the same way
// const car = new Car('Honda', 'Civic');
// car.honk();
//===================================================
// You've already used several ES6 tricks in this project, plus many others in previous ones. Some of the highlights that didn't fit into our command-line RPG include the following:

// // array destructuring
// const [first, second] = ['first item', 'second item'];

// // rest operator
// const {name, ...details} = {name: 'Diane', occupation: 'Developer', location: 'USA'};

// // asynchronous promises
// new Promise((resolve, reject) => {
//  setTimeout(() => {
//    resolve('success');
//  }, 2000);
// });