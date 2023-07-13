function sendRequest() {

    // API endpoint URL
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    // Your API key
    const apiKey = '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';

    // Get the user input
    // const userInput = document.getElementById('userInput').value;

    // Request payload
    const payload = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{
            role: 'system',
            content: 'You love music and want to help create the best playlist based off what info I give you! Please keep your suggestions to 10 songs or less'
        }, {
            role: 'user',
            content: "Give me a story about a D&D Character that is a" + race + charClass + "I have this" + equipment + "and this" + trait + ". We have to defeat a group of " + monster
        }],
        max_tokens: 400,
        temperature: 0.7
    };

    // Make the API call
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            console.log(data.choices[0].message.content);

            // Show the response in the output element
            // const outputElement = document.getElementById('output');
            // outputElement.textContent = data.choices[0].message.content;
        })
}

sendRequest()

charClass, race , monster, skill, trait, equipment

var url = 'https://www.dnd5eapi.co/api/classes'
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })











// var inputCity = '';
// var tripAdvisorKey = 'E0D73F29D2C94BFBABA0BDBF9322ED93';

// function getCords(url) {
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var lon = data[0].lon;
//             var lat = data[0].lat;
//             var cords = [lat, lon]
//             console.log(cords)
//             return cords
//         })
//         .then(function (data) {
//             console.log(data[0])
//             console.log(data[1])
//             var urlHotels = 'https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=41.8755616%2C%20-87.6244212&key=E0D73F29D2C94BFBABA0BDBF9322ED93&category=hotels&language=en';
//             console.log(urlHotels)
//             var options = {
//                 method: 'GET', 
//                 headers: {'accept': 'application/json'}
//             };

//             fetch(urlHotels, options)
//                 // console.log("test")
//                 // .then(response => response.json())
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (data) {
//                     console.log(data)
//                 })
            
//                 // .then(response => console.log(response))
//                 // .catch(err => console.error(err));
//         })
// }

// $('#searchBtn').on('click', function() {
//     inputCity = $('#cityInput').val()
//     var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=1&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
//     getCords(geoUrl)
// })


// var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + "Chicago" + '&limit=1&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
// getCords(geoUrl)