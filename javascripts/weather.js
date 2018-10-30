$(document).ready(function() {
  $("#cityField").keyup(function() {
    console.log("here");
    var url = "getcity?q=" + $("#cityField").val();
    $.getJSON(url, function(data) {
      console.log(url);

      var everything;
      everything = "<ul>";
      $.each(data, function(i, item) {
        everything += "<li> " + data[i].city;
      });

      everything += "</ul>";
      $("#txtHint").html(everything);
    });
    $("#txtHint").text("Keyup " + $("#cityField").val());
  });

  $("#weatherButton").click(function(e) {
    var value = $("#cityField").val();
    console.log(value);
    $("#dispalyCity").text(value);
    e.preventDefault();
    var myurl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7dfafa87623620c7116fcd47d27548f2&q="
    myurl += value;
    $.ajax({
      url: myurl,
      dataType: "json",
      success: function(parsed_json) {
        var location = parsed_json['name'];
        var weather = parsed_json['weather'][0]['main'];
        var temp = parsed_json['main']['temp'];
        var weather_icon = parsed_json['weather'][0]['icon'];
        var humidity = parsed_json['main']['humidity'];
        var temp_min = parsed_json['main']['temp_min'];
        var temp_max = parsed_json['main']['temp_max'];
        var wind_speed = parsed_json['wind']['speed'];
        everything = "<img src=\"http://openweathermap.org/img/w/" + weather_icon + ".png\"/>"
        everything += "<p>";
        everything += "<br>Location: " + location;
        everything += "<br>Weather: " + weather + " (" + temp + "&#8457;)";
        everything += "<br>Low: " + temp_min + "&#8457; | High: " + temp_max + "&#8457;";
        everything += "<br>Humidity: " + humidity + "%";
        everything += "<br>Wind: " + wind_speed + " mph";
        everything += "</p>";
        $("#weather").html(everything);
      }
    });
  });

  $("#dictionaryButton").click(function(e) {
        e.preventDefault();
        var url = "dictionary?q=" + $("#myDictionary").val();
        $.getJSON(url, function(data) {
            var everything = "Definition: <ul>";
            $.each(data, function(i, item) {
                everything += "<li>" + data[i].defenition + "</li>";
            });
            everything += "</ul>";
            $("#result").html(everything);
        });
    });


});
