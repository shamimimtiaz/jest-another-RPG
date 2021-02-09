// function Car(make, model) {
//     this.make = make;
//     this.model = model;
//   }
//   const car = new Car('Honda', 'Civic');
// console.log(car);


function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
  
if (this.name === 'health') {
    this.value = Math.floor(Math.random()* 10 + 30); //if the potion is a health potion, its value is a number between 30 and 40. Add the following code:
    } else {
    this.value = Math.floor(Math.random()* 5 + 7); // The Potion() constructor should take in a name parameter and assign the value property to be a random number between 7 and 12.
    }
}

module.exports = Potion;