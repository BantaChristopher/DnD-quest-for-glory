var randomSkill = '';
var randomEquipment = '';
var randomTrait = '';
var randomClass = "";
var randomMonster = "";
var randomRace = "";
var setName = "";
var url = 'https://www.dnd5eapi.co/api';

$('#setName').on('click', function() {
    setName = $('#displayName').val()
})

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
    $('#displayRaceError').text('');
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
    if(randomRace === "") {
        $('#displayRaceError').text('Please randomize a race!');
        $('#displayRaceError').attr("style", "color: #FF3333; font-family: 'Poppins', sans-serif; font-size: small; font-style: italic;");
        setTimeout(() => {
            $('#displayRaceError').text('');
        }, 4000);
        return;
    }
    sendRequest()
    $('#heroImage').attr('src', "./assets/Character Images/"+ randomRace +".jpg")
    $('#heroImage').attr('alt', "An image of our hero, a grusome and fearless looking " + randomRace)

    
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
            content: "Give me a story about a D&D Character named " + setName + " that is a " + randomRace + ", and their class is " + randomClass + ". Our hero needs to defeat a horrifying group of " + randomMonster + ". The character has a unique skill of " + randomSkill + ", an amazing trait of " + randomTrait + ", and an equipment piece of " + randomEquipment + " to help fight against the " + randomMonster + "."
        }],
        
        max_tokens: 1000,
        temperature: 0.7
    };

    var loading = $('<button>', {class: 'button transparent-btn is-loading', id: 'loading', style: ' width:100%'})
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
            var skipButton = $('<button>', {class: 'button custom-btn', id: 'skip'})
            $(skipButton).text('Skip')
            $('#skipBtn').append(skipButton);
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
        $('#saveStoryDiv').attr("style", "color: #FF3333; font-family: 'Poppins', sans-serif; font-style: italic;");
        setTimeout(() => {
            $('#saveStoryDiv').text('');
        }, 7000);
        return;
    } else if(currentStoryContent === ''){
        $('#saveStoryDiv').text("There's no story to save!");
        $('#saveStoryDiv').attr("style", "color: #FF3333; font-family: 'Poppins', sans-serif; font-style: italic;");
        setTimeout(() => {
            $('#saveStoryDiv').text('');
        }, 7000);
        return;
    }

    var story = {
        name: storyName,
        storyContent: currentStoryContent,
        charName: setName,
        class: randomClass,
        trait: randomTrait,
        race: randomRace,
        skill:  randomSkill,
        equipment: randomEquipment,
        monster: randomMonster
    }

    storyHistory.push(story);
    localStorage.setItem('storyHistory', JSON.stringify(storyHistory));

    index = storyHistory.length - 1
    var historyBtn = $('<button>', {class: 'button custom-btn', style: 'width: 100%', id: index})
    historyBtn.text(storyName);
    $('#historyCol').append(historyBtn);
    historyBtn.on('click', function() {
        reset()
        var index = ($(this).attr('id'))
        index = parseInt(index)
        var timer = 1
        var timerFunction = setInterval(function() {
            timer--
            if (timer === 0) {
                displayName
                $('#displayName').text(storyHistory[index].charName)
                $('#displayClass').text(storyHistory[index].class)
                $('#displayTrait').text(storyHistory[index].trait)
                $('#displayRace').text(storyHistory[index].race)
                $('#displaySkill').text(storyHistory[index].skill)
                $('#displayEquipment').text(storyHistory[index].equipment)
                $('#displayMonster').text(storyHistory[index].monster)
                randomRace = storyHistory[index].race
                $('#heroImage').attr('src', "./assets/Character Images/"+ randomRace +".jpg")
                $('#storyOutput').attr("Class", "typewriter")
                $('#storyOutput').text(storyHistory[index].storyContent)
                clearInterval(timerFunction)
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
            var historyBtn = $('<button>', {class: 'button custom-btn', style: 'width: 100%', id: [i]})
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
                        $('#displayName').text(storyHistory[index].charName)
                        $('#displayClass').text(storyHistory[index].class)
                        $('#displayTrait').text(storyHistory[index].trait)
                        $('#displayRace').text(storyHistory[index].race)
                        $('#displaySkill').text(storyHistory[index].skill)
                        $('#displayEquipment').text(storyHistory[index].equipment)
                        $('#displayMonster').text(storyHistory[index].monster)
                        randomRace = storyHistory[index].race
                        $('#heroImage').attr('src', "./assets/Character Images/"+ randomRace +".jpg")
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
