const Potion = require('../lib/Potion.js');

//potions will store both a name and a value, we should make them objects instead of variables.

// test('creates a health potion object', () => {
    
//     const potion = new Potion('health'); //we'll use this to create new Potion objects.
//     //Here, we're assuming that when we create a new Potion, it will take the string we pass in and assign it to the potion's name.

// expect(potion.name).toBe('health');
// expect(potion.value).toEqual(expect.any(Number)); //The expect.any() method takes a constructor as an argument.
//     //Here, we're expecting that the value property is created with a Number() constructor.
// });

test('creates a random potion object', () => {
    const potion = new Potion();
  
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
  });






