const { expect, test } = require('@jest/globals');
const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)])); //Note that the player's inventory should be an array containing an object
  });

  test("gets player's stats as an object", () => {
    const player = new Player('Dave');
  
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
  });

  test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
    expect(player.getInventory()).toEqual(expect.any(Array));
    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
  });


  test("get player's health value", () => {
    const player = new Player ('Dave');
//The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health.
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
  });

  //Now that we have our getHealth() method, we're going to add another method to check if the player is alive.

  test('checks if player is alive or not', () => {
    const player = new Player('Dave');
    expect(player.isAlive()).toBeTruthy();
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
  });

  //Here we write another test to handle the reduceHealth() method to see if the correct amount of health is being subtracted from the Player health property

  test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;
    player.reduceHealth(5);
  
    expect(player.health).toBe(oldHealth - 5);
 //Here we call the reduceHealth() method twice—the second time with an absurdly high value to make sure that it never goes negative.
  player.reduceHealth(99999);
  expect(player.health).toBe(0);
  });