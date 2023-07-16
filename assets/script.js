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
                var skillIndex = parseInt(Math.floor(Math.random() * data.results.length));
                randomSkill = data.results[skillIndex].name;
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
                var equipmentIndex = parseInt(Math.floor(Math.random() * data.results.length));
                randomEquipment = data.results[equipmentIndex].name;
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
                var traitsIndex = parseInt(Math.floor(Math.random() * data.results.length));
                randomTrait = data.results[traitsIndex].name;
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
            $('#displayMonster').text(randomMonster);
        });
})

$('#generateStory').on('click', function() {
    sendRequest()
})

var currentStoryContent = '';
function sendRequest() {

    // API endpoint URL
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = 'sk-Prhln' + 'C3XR9TfFo6Tm4hA' + 'T3BlbkFJEL124rH' + 'TQ59iQTBniEQd'
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
        
        max_tokens: 100,
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
            currentStoryContent = data.choices[0].message.content;
            // Show the response in the output element
            $('#storyOutput').text(currentStoryContent)
            $('#storyOutput').attr("Class", "typewriter")
        })
}

// Save story in local storage when save button is clicked
var storyHistory = [];
$('#saveStory').on("click", function(){
    var storyName = $('#storyName').val();

    // ensure a story name was entered
    if(storyName === ''){
        var error = document.createElement('p');
        $(error).text('Please enter a story name');
        $(error).attr("style", "color: red");
        console.log(error);
        $('#saveStoryDiv').prepend(error);
        return;
    }

    var story = {
        name: storyName,
        storyContent: currentStoryContent,
    }

    storyHistory.push(story);
    localStorage.setItem('storyHistory', JSON.stringify(storyHistory));
    var historyEl = document.createElement('button');
    $(historyEl).text(story.name);
    $(historyEl).attr('class', 'button is-primary');
    $(historyEl).attr('style', 'width: 100%');
    $('#historyCol').append(historyEl);
}); 

function renderStories () {
    var storedHistory = JSON.parse(localStorage.getItem('storyHistory'));
    if (storedHistory !== null){
        storyHistory = storedHistory;
        for (i=0; i < storyHistory.length; i++){
            var storyItem = storyHistory[i];
            var historyBtn = $('<button>', {class: 'button is-primary', style: 'width: 100%'})
            $(historyBtn).text(storyItem.name);
            $('#historyCol').append(historyBtn);
            historyBtn.on('click', function() {
                $('#storyOutput').text(storyItem.storyContent)
                $('#storyOutput').attr("Class", "typewriter")
            })
        }
    
    }
}

renderStories();