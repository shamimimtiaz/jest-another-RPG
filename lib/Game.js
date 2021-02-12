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
};

inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    // test the object creation
    console.log(this.currentEnemy, this.player);
  });
module.exports = Game;