describe("Thermostat", function() {
  
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it ('starts with an initial temperature of 20 degrees', function() {
    expect(thermostat.temperature).toBe(20)
  });

  it ('increase the temperature', function() {
    thermostat.up(1)
    expect(thermostat.temperature).toBe(21)
  });

  it ('decrease the temperature', function() {
    thermostat.down(1)
    expect(thermostat.temperature).toBe(19)
  });

  it ('decrease the temperature', function() {
    thermostat.down(12)
    expect(thermostat.temperature).toBe(10)
  });
  
});
