var inputCity = '';
var tripAdvisorKey = 'E0D73F29D2C94BFBABA0BDBF9322ED93';

function getCords(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lon = data[0].lon;
            var lat = data[0].lat;
            var cords = [lat, lon]
            console.log(cords)
            return cords
        })
        .then(function (data) {
            console.log(data[0])
            console.log(data[1])
            var urlHotels = 'https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong='+ data[0] + '%2C%20' + data[1] + '&key=' + tripAdvisorKey + '&category=hotels&language=en';
            var options = {
                method: 'GET', 
                headers: {accept: 'application/json'},
                mode: "no-cors"};

            fetch(urlHotels, options)
                .then(response => response.json())
                .then(response => console.log(response))
        })
}

$('#searchBtn').on('click', function() {
    inputCity = $('#cityInput').val()
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=1&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
    getCords(geoUrl)
})


var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + "Chicago" + '&limit=1&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
getCords(geoUrl)