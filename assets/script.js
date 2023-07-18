// randomly generated character traits using the DnD API
var randomSkill = '';
var randomEquipment = '';
var randomTrait = '';
var randomClass = "";
var randomMonster = "";
var randomRace = "";
var setName = "";

// variable for the story content that the ChatGPT API creates
var currentStoryContent = '';

// array for story to be pushed to when saved in local storage
var storyHistory = [];

// URL for the DnD API
var url = 'https://www.dnd5eapi.co/api';

// User can enter a character name of their choice
$('#setName').on('click', function() {
    setName = $('#displayName').val()
})

// User can randomly generate a class, trait, race, skill, equipment, and monster using the DnD API  
$('#randomSkill').on('click', function() {
    // URL extension specifies the category to call from the API
    var urlExtension = '/skills';
    fetch(url+urlExtension)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                // randomizes the possibilities the API has to generate a random result
                var skillIndex = parseInt(Math.floor(Math.random() * data.results.length));
                // sets the category variable to the randomized result and displays it on the page for the user to see
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

// once the user is satisfied with their selections from the random generators, they can generate a story about their character using the ChatGPT API and see an image of their character type
$('#generateStory').on('click', function() {
    reset()
    //Ensures that a race is selected so that a character image is sure to populated
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

// send request to ChatGPT's API to create a story based on the character selections
function sendRequest() {
    // ChatGPT API endpoint URL and key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = 'sk-Prhln' + 'C3XR9TfFo6Tm4hA' + 'T3BlbkFJEL124rH' + 'TQ59iQTBniEQd'

    // Request payload and prompt ChatGPT to give a response appropriate to the context 
    const payload = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{
            role: 'system',
            content: 'You are an EPIC dungeon master for the game Dungeons and Dragons. Please give me an incredible story about the journey of our character. Be sure to include tons of twists and turns in the story as well as include every item and character that we give you. Please provide very specific details and include a distinct conflict as the main storyline. No more than 1000 characters long please.'
        }, {
            role: 'user',
            // Utilize the variables set above in the ChatGPT prompt so that it creates a story specific to the user
            content: "Give me a story about a D&D Character named " + setName + " that is a " + randomRace + ", and their class is " + randomClass + ". Our hero needs to defeat a horrifying group of " + randomMonster + ". The character has a unique skill of " + randomSkill + ", an amazing trait of " + randomTrait + ", and an equipment piece of " + randomEquipment + " to help fight against the " + randomMonster + "."
        }],
        
        max_tokens: 1000,
        temperature: 0.7
    };
    
    var loading = $('<button>', {class: 'button transparent-btn is-loading', id: 'loading', style: ' width:100%'})
    $('#storyCol').append(loading); 

    //Makes the api call to ChatGPT
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
            //Set story to variable
            currentStoryContent = data.choices[0].message.content;
            //Post story to page with typewriter effect.
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

// Saves story in local storage when save button is clicked
$('#saveStory').on("click", function(){
    var storyName = $('#storyName').val();

    // ensure a story name was entered/that there is a story to save
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
    // Variable to save all items to local storage
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
    // Adds variable above to array and then pushes to localStorage
    storyHistory.push(story);
    localStorage.setItem('storyHistory', JSON.stringify(storyHistory));
    index = storyHistory.length - 1
    var historyBtn = $('<button>', {class: 'button custom-btn', style: 'width: 100%', id: index})
    historyBtn.text(storyName);
    $('#historyCol').append(historyBtn);
    // On click of appended history button, sets all items from localStorage and starts reading the story saved.
    historyBtn.on('click', function() {
        reset()
        var index = ($(this).attr('id'))
        index = parseInt(index)
        var timer = 1
        //A timer function is required after resetting to ensure the typewriter effect fully removes and can be reapplied with no issues
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
                var skipButton = $('<button>', {class: 'button custom-btn', id: 'skip'})
                $(skipButton).text('Skip')
                $('#skipBtn').append(skipButton);
                $(skipButton).on('click', function(){
                    $('#storyOutput').removeClass("typewriter");
                    $('#skip').remove();
                });
                clearInterval(timerFunction)
                } 
            }, 500)
    })
}); 

//This function fires on page load, for every localStorage item in the array it will print out a button in the history.
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
                //A timer function is required after resetting to ensure the typewriter effect fully removes and can be reapplied with no issues
                var timerHistory = setInterval(function() {
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
                        var skipButton = $('<button>', {class: 'button custom-btn', id: 'skip'})
                        $(skipButton).text('Skip')
                        $('#skipBtn').append(skipButton);
                        $(skipButton).on('click', function(){
                            $('#storyOutput').removeClass("typewriter");
                            $('#skip').remove();
                        });
                        clearInterval(timerHistory)
                    }}, 500)
            })
        }
    
    }
}

//Resets the main story box, removing any content that might be in there and resetting the typewriter effect
function reset() {
    $('#storyOutput').text('');
    $('#storyOutput').removeClass('typewriter');
    $('#skip').remove();
}

//Clears your localStorage and removes all history buttons.
$('#resetStoryHistory').on("click", function () {
    localStorage.removeItem('storyHistory');
    $('#historyCol').empty();
})

//Initial call to render past stories
renderStories();
