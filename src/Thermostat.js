function Thermostat() {
  this.temperature = 20
  minTemp = 10
};

Thermostat.prototype.up = function(degree) {
  this.temperature += degree
};

Thermostat.prototype.down = function(degree) {
  this.temperature -= degree
  if (this.isMinTemp() === true) {
  this.temperature = minTemp; };
};

Thermostat.prototype.isMinTemp = function() {
  if (this.temperature <= minTemp) {
    return true;
  };
};
