function Thermostat() {
  this.MIN_TEMP = 10
  this.DEFAULT_TEMP = 20;
  this._temp = this.DEFAULT_TEMP;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.LOW_USAGE_UPPER_LIMIT = 18;
  this.MEDIUM_USAGE_UPPER_LIMIT = 25;
  this._maxTemp = this.MAX_LIMIT_PSM_ON;
};

Thermostat.prototype.getCurrentTemp = function() {
  return this._temp;
};

Thermostat.prototype.up = function(number = 1) {
  if  (this.isMaxTemp()) {
    return;
  }
  this._temp += number;
};

Thermostat.prototype.down = function(number = 1) {
  this._temp -= number
  if (this.isMinTemp() === true) {
    this._temp = this.MIN_TEMP; 
  };
};

Thermostat.prototype.isMinTemp = function() {
  return this._temp <= this.MIN_TEMP;
};

Thermostat.prototype.isMaxTemp = function() {
  return this._temp >= this._maxTemp;
};

Thermostat.prototype.powerSaveOn = function() {
  this._maxTemp = this.MAX_LIMIT_PSM_ON;
  if (this._temp > 25) {
    this._temp = 25;
  };
};

Thermostat.prototype.powerSaveOff = function() {
  this._maxTemp = this.MAX_LIMIT_PSM_OFF;
};

Thermostat.prototype.powerSave = function() {
  if (this._maxTemp === this.MAX_LIMIT_PSM_OFF){
    this.powerSaveOn();
  }
  else {
    this.powerSaveOff();
  };
};

Thermostat.prototype.reset = function() {
  this._temp = this.DEFAULT_TEMP;
};

Thermostat.prototype.getEnergyUsage = function(){
  if (this._temp < this.LOW_USAGE_UPPER_LIMIT) {
    return 'low-usage'
  }
    else if(this._temp < this.MEDIUM_USAGE_UPPER_LIMIT) {
    return 'medium-usage'
  }  
  return 'high-usage'
};