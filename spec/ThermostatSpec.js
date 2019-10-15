describe("Thermostat", function() {
  
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it ('starts with an initial temperature of 20 degrees', function() {
    expect(thermostat._temp).toBe(20)
  });

  it ('increase the temperature', function() {
    thermostat.up(1)
    expect(thermostat._temp).toBe(21)
  });

  it ('decrease the temperature', function() {
    thermostat.down(1)
    expect(thermostat._temp).toBe(19)
  });

  it ('minimum temperature of 10', function() {
    thermostat.down(12)
    expect(thermostat._temp).toBe(10)
  });

it('if power saving mode is on by default, maximum temp is 25', function () {
  expect(thermostat._maxTemp).toEqual(25)
});

it('if power saving mode is off, maximum temp is 32', function () {
  thermostat.powerSaveOff();
  expect(thermostat._maxTemp).toEqual(32)
});

it('turns power save off if on', function () {
  thermostat.powerSave();
  expect(thermostat._maxTemp).toEqual(32)
});

it('turns power save on if off', function () {
  thermostat.powerSaveOff();
  thermostat.powerSave();
  expect(thermostat._maxTemp).toEqual(25)
});

it('user cannot increase temperature beyond 32', function () {
  thermostat.powerSaveOff();
  thermostat.up(12)
  thermostat.up(1)
  expect(thermostat.getCurrentTemp()).toEqual(32)
});

it('user can reset and bring the temperature back to 20', function (){
  thermostat.up();
  expect(thermostat.getCurrentTemp()).toEqual(21)
  thermostat.reset();
  expect(thermostat.getCurrentTemp()).toEqual(20)
});

it('tells the user enegry usage is low', function(){
  thermostat.down(3)
  expect(thermostat.getCurrentTemp()).toEqual(17)
  expect(thermostat.getEnergyUsage()).toEqual('low-usage')
});

it('tells the user enegry usage is medium', function(){
  expect(thermostat.getCurrentTemp()).toEqual(20)
  expect(thermostat.getEnergyUsage()).toEqual('medium-usage')
});

it('tells the user enegry usage is high', function(){
  thermostat.up(8)
  expect(thermostat.getCurrentTemp()).toEqual(28)
  expect(thermostat.getEnergyUsage()).toEqual('high-usage')
});

});