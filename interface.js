$(document).ready(function(){
  var thermostat = new Thermostat();
  updateTemperature();
  getLocation();

  function getLocation() {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  function showPosition(position) {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
      var currentTemp = data.main.temp
      var currentWeather = data.weather[0].description
      var currentLocation = data.name
      $('#current-weather').text(currentWeather.toUpperCase() + " " + currentTemp + "°C");
      $('#current-location').text(currentLocation);
    })
  }

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
    $('#powersave').attr('class', thermostat.powerSave());
    updateTemperature();
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemp());
    updateStatus();
  };

  function updateStatus() {
    $('#low-usage').attr('class','energy_usage');
    $('#medium-usage').attr('class','energy_usage');
    $('#high-usage').attr('class','energy_usage');
    $('#'+thermostat.getEnergyUsage()).addClass(thermostat.getEnergyUsage());
  };

});