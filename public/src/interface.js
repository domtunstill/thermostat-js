$(document).ready(function(){
  var thermostat = new Thermostat();
  getLocation();
  load();

  function getLocation() {
      navigator.geolocation.getCurrentPosition(showPosition);
  }

  $.get("/temperature", function(response) {
    response = JSON.parse(response)
    thermostat._temp = response[1]
    updateTemperature()
  })

  function load(){
    $.getJSON( "public/temp.json", function(data) {
      // var items = [];
      // $.each( data, function( key, val ) {
      //   items.push( "<li id='" + key + "'>" + val + "</li>" );
      // });
     
      // $( "<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join( "" )
      // }).appendTo( "body" );
      console.log(data)
    })
    // temp = JSON.load File.open("/temp.json");
    // var myData = JSON.parse(temp);
    // alert(myData.temperature);
  }

  function sendState() {
    var temperature = { temperature: thermostat._temp }
    $.post("/temperature", temperature)
  }
  
  function showPosition(position) {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
      var currentTemp = data.main.temp
      var currentWeather = data.weather[0].description
      var currentLocation = data.name
      $('#current-weather').text(currentWeather.toUpperCase() + " " + currentTemp + "°C");
      $('#current-location').text(currentLocation);
      $('#main-image').attr('class', currentWeather.replace(/ /,"-"));
    })
  }

  $('#increase').click(function(){
    thermostat.up();
    sendState();
    updateTemperature();
  })

  $('#decrease').click(function(){
    thermostat.down();
    sendState();
    updateTemperature();
  })

  $('#reset_temperature').click(function(){
    thermostat.reset();
    sendState();
    updateTemperature();
  })

  $('#powersave').click(function(){
    $('#powersave').attr('class', thermostat.powerSave());
    sendState();
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