// mobile menu JS
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () =>{
    navbarMenu.classList.toggle('is-active');
});

var randomSkill = '';
var randomEquipment = '';
var randomTrait = '';
var randomClass = "";
var randomMonster = "";
var randomRace = "";
var url = 'https://www.dnd5eapi.co/api';

$('#randomSkill').on('click', function() {
    var urlExtension = '/skills';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data.results.length);
                var skillIndex = parseInt(Math.floor(Math.random() * data.results.length));
                console.log(skillIndex);
                randomSkill = data.results[skillIndex].name;
                console.log(randomSkill);
                $('#displaySkill').text(randomSkill);
            });
})

$('#randomEquipment').on('click', function() {
    var urlExtension = '/equipment';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var equipmentIndex = parseInt(Math.floor(Math.random() * data.results.length));
                console.log(equipmentIndex);
                randomEquipment = data.results[equipmentIndex].name;
                console.log(randomEquipment);
                $('#displayEquipment').text(randomEquipment);
            });
})
        

$('#randomTrait').on('click', function() {
    var urlExtension = '/traits';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var traitsIndex = parseInt(Math.floor(Math.random() * data.results.length));
                console.log(traitsIndex);
                randomTrait = data.results[traitsIndex].name;
                console.log(randomTrait);
                $('#displayTrait').text(randomTrait);
            });
})


$('#randomClass').on('click', function() {
    var urlExtension = '/classes';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var index = parseInt(Math.floor(Math.random() * data.results.length));
            randomClass = data.results[index].name;
            console.log(randomClass);
            $('#displayClass').text(randomClass);
        });
})


$('#randomRace').on('click', function() {
    var urlExtension = '/races';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var index = parseInt(Math.floor(Math.random() * data.results.length));
            randomRace = data.results[index].name;
            console.log(randomRace);
            $('#displayRace').text(randomRace);
        });
})


$('#randomMonster').on('click', function() {
    var urlExtension = '/monsters';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var index = parseInt(Math.floor(Math.random() * data.results.length));
            randomMonster = data.results[index].name;
            console.log(randomMonster);
            $('#displayMonster').text(randomMonster);
        });
})

$('#generateStory').on('click', sendRequest())


function sendRequest() {

    // API endpoint URL
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = 'sk-Prhln' + 'C3XR9TfFo6Tm4hA' + 'T3BlbkFJEL124rH' + 'TQ59iQTBniEQd'
    console.log(apiKey)
    // Request payload
    const payload = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{
            role: 'system',
            content: 'You are an EPIC dungeon master for the game Dungeons and Dragons. Please give me an incredible story about the journey of our character. Be sure to include tons of twists and turns in the story as well as include every item and character that we give you. Please provide very specific details and include a distinct conflict as the main storyline. No more than 1000 characters long please.'
        }, {
            role: 'user',
            content: "Give me a story about a D&D Character that is a " + randomRace + randomClass + ". We have to defeat a horrifying group of " + randomMonster + ". The character has the skill of " + randomSkill + ", a trait of " + randomTrait + ", and equipment piece of " + randomEquipment + " to help fight against the " + randomMonster + "."
        }],
        
        max_tokens: 1000,
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