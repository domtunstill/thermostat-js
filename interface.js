$(document).ready(function(){
  var thermostat = new Thermostat();

  updateTemperature();

  $('#increase').click(function(){
    thermostat.up();
    updateTemperature();
  })

  $('#decrease').click(function(){
    thermostat.down();
    updateTemperature();
  })

  $('#reset_temperature').click(function(){
    thermostat.reset();
    updateTemperature();
  })

  $('#powersave').click(function(){
    thermostat.powerSave();
    updateTemperature();
  })

  function updateStatus() {
    if(thermostat._maxTemp === 25) {
      $('#powersave').css('background-color', 'green');
    } else {
      $('#powersave').css('background-color', 'red');
    }

    if(thermostat.getEnergyUsage() === 'low-usage') {
      $('#temperature').css('color', 'green');
    } else if(thermostat.getEnergyUsage() === 'medium-usage') {
      $('#temperature').css('color', 'black');
    } else {
      $('#temperature').css('color', 'red');
    }
    
  };

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemp());
    updateStatus();
  };

});