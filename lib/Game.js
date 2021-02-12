//the Game object will certainly need access to Player and Enemy for the game logic to work. 
const inquirer = require ('inquirer');
const Enemy = require ('./Enemy');
const Player = require ('./Player');

function Game() {
//we start filling out the Game object's properties.
this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

//The initializeGame() method is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {

    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

//We also need to keep track of which Enemy object is currently fighting the Player. When the game starts, this would be the first object in the array.
this.currentEnemy = this.enemies[0];


inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

//your inquirer callback should look like the following code
    this.startNewBattle();

    // test the object creation
    console.log(this.currentEnemy, this.player);
  });
};

//The startNewBattle() method will be called to kick off the first battle and then called again anytime a new round starts.
//Establish who will take their turn first based on their agility values.

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
  };

//If Player turn:
// Prompt user to attack or use a Potion
// If using a Potion:
// Display list of Potion objects to user
// Apply selected Potion effect to Player
// If attacking:
// Subtract health from the Enemy based on Player attack value
// If Enemy turn:
// Subtract health from the Player based on Enemy attack value

  Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        inquirer
          .prompt({
            type: 'list', // use inquirer type: list to display list of choice "Attack" or "use potion"
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
          })
          .then(({ action }) => {
            if (action === 'Use potion') {
                if (!this.player.getInventory()) {
                  console.log("You don't have any potions!");
                  return this.checkEndOfBattle();
                }
              
                inquirer
                  .prompt({
                    type: 'list',
                    message: 'Which potion would you like to use?',
                    name: 'action',
                    //Array.prototype.map() method. The map() method creates a new array based on the results of a callback function used in the original array.
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                  })
                  .then (({action}) => {
                      const potionDetails = action.split (': ');
                      this.player.usePotion(potionDetails[0] - 1);
                      console.log (`You used a ${potionDetails[1]} potion`);
                      this.checkEndOfBattle();
                  });
            } else {
              const damage = this.player.getAttackValue();
              this.currentEnemy.reduceHealth(damage);
      
              console.log(`You attacked the ${this.currentEnemy.name}`);
              console.log(this.currentEnemy.getHealth());

              this.checkEndOfBattle();
            }
          });
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());

            this.checkEndOfBattle();
        }
    };
    

//Our checkEndOfBattle() logic should first verify if both characters are alive and can continue fighting. If so, we should switch the turn order and run battle() again.

Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
      this.isPlayerTurn = !this.isPlayerTurn;
      this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
      console.log(`You've defeated the ${this.currentEnemy.name}`);
  

            //While enemy defeated player receive a potion

    this.player.addPotion(this.currentEnemy.potion);
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

    this.roundNumber++;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log('You win!');
    }
  } else {
    console.log("You've been defeated!");
  }
};



module.exports = Game;












// The map() method creates a new array based on the results of a callback function used in the original array. The following code shows an example:

// const numbers = [5, 10, 15];

// const newArr = numbers.map((num) => `hello x ${num}`);

// // not using ES6 syntax
// const newArr2 = numbers.map(function(num) {
//  return 'hello x ' + num;
// });

// console.log(newArr); // ['hello x 5', 'hello x 10', 'hello x 15']




// This checkEndOfBattle() method will need to run immediately after the Player or Enemy has taken their turn. A turn can end in a few ways, including the following:

// The Player uses a Potion

// The Player attempts to use a Potion but has an empty inventory

// The Player attacks the Enemy

// The Enemy attacks the Player