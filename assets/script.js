var skill = false;
var trait = false;
var equipment = false; 

var randomSkill = '';
var randomEquipment = '';
var randomTrait = '';

if (skill) {
    fetch ('https://www.dnd5eapi.co/api/skills', {
        headers: {"Accept": "application/json"}
    })
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data.results.length);
                var skillIndex = parseInt(Math.floor(Math.random() * data.results.length));
                console.log(skillIndex);
                randomSkill = data.results[skillIndex].name;
                console.log(randomSkill);
            });
}

if (equipment) {
    fetch ('https://www.dnd5eapi.co/api/equipment', {
        headers: {"Accept": "application/json"}
    })
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var equipmentIndex = parseInt(Math.floor(Math.random() * data.results.length));
                console.log(equipmentIndex);
                randomEquipment = data.results[equipmentIndex].name;
                console.log(randomEquipment);
            });
}
        

