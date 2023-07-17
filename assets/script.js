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
    reset()
    sendRequest()
})

var currentStoryContent = '';
function sendRequest() {


    // $('#storyOutput').text('Loading...')
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

    var loading = $('<button>', {class: 'button is-warning is-loading', id: 'loading', style: ' width:100%'})
    $('#storyCol').append(loading); 

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
            
            $('#loading').remove();
            // skip typewrite effect if user wants full response
            var skipButton = $('<button>', {class: 'button is-primary', id: 'skip'})
            $(skipButton).text('Skip')
            $('#storyCol').append(skipButton);
            $(skipButton).on('click', function(){
                $('#storyOutput').removeClass("typewriter");
                $('#skip').remove();
    });
        })
}

// Save story in local storage when save button is clicked
var storyHistory = [];
$('#saveStory').on("click", function(){
    var storyName = $('#storyName').val();

    // ensure a story name was entered
    if(storyName === ''){
        $('#saveStoryDiv').text('Please enter a story name');
        $('#saveStoryDiv').attr("style", "color: #FF3333");
        setTimeout(() => {
            $('#saveStoryDiv').text('');
        }, 7000);
        return;
    }

    var story = {
        name: storyName,
        storyContent: currentStoryContent,
    }

    storyHistory.push(story);
    localStorage.setItem('storyHistory', JSON.stringify(storyHistory));

    index = storyHistory.length - 1
    var historyBtn = $('<button>', {class: 'button is-primary', style: 'width: 100%', id: index})
    historyBtn.text(storyName);
    $('#historyCol').append(historyBtn);
    historyBtn.on('click', function() {
        reset()
        var index = ($(this).attr('id'))
        index = parseInt(index)
        var timer = 1
        var test = setInterval(function() {
            timer--
            if (timer === 0) {
                $('#storyOutput').attr("Class", "typewriter")
                $('#storyOutput').text(storyHistory[index].storyContent)
                clearInterval(test)
                } 
            }, 500)
    })
}); 

function renderStories () {
    var storedHistory = JSON.parse(localStorage.getItem('storyHistory'));
    if (storedHistory !== null){
        storyHistory = storedHistory;
        for (i=0; i < storyHistory.length; i++){
            var storyItem = storyHistory[i];
            var historyBtn = $('<button>', {class: 'button is-primary', style: 'width: 100%', id: [i]})
            $(historyBtn).text(storyItem.name);
            $('#historyCol').append(historyBtn);
            historyBtn.on('click', function() {
                reset()
                var index = ($(this).attr('id'))
                index = parseInt(index)
                var timer = 1
                var test = setInterval(function() {
                    timer--
                    if (timer === 0) {
                        $('#storyOutput').attr("Class", "typewriter")
                        $('#storyOutput').text(storyHistory[index].storyContent)
                        clearInterval(test)
                    } 
                }, 500)
            })
        }
    
    }
}

function reset() {
    $('#storyOutput').text('');
    $('#storyOutput').removeClass('typewriter');
    $('#skip').remove();
}

$('#resetStoryHistory').on("click", function () {
    localStorage.removeItem('storyHistory');
    $('#historyCol').empty();
})

renderStories();
