$(document).ready(function(){
  var thermostat = new Thermostat();

  updateTemperature();

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    var currentTemp = data.main.temp
    var currentWeather = data.weather[0].description
    // $('#current-temperature').text(currentTemp + "y");
    $('#current-weather').text(currentWeather.toUpperCase() + " " + currentTemp + "°C");
  })

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
      $('#powersave').css('background-color', 'rgb(118, 223, 27)');
    } else {
      $('#powersave').css('background-color', 'rgb(244, 100, 78)');
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