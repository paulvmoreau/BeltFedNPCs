
var races = {
  'Human': 50,
  'Elf': 20,
  'Dwarf': 20,
  'Dragonborn':3,
  'Tiefling':3,
  'Gnome':5,
  'Halfling':5,
  'Half-Elf':10,
  'Half-Orc':10
};

var racesPlural ={
  'Human' : 'Humans',
  'Elf' :'Elves',
  'Dwarf' : 'Dwarves',
  'Dragonborn': 'Dragonborn',
  'Tiefling': 'Tieflings',
  'Gnome': 'Gnomes',
  'Halfling': 'Halflings',
  'Half-Elf': 'Half-Elves',
  'Half-Orc': 'Half-Orcs'
};

var classes = ['Barbarian','Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
var genders = ['Male', 'Female'];
var genderBender = {
  'None': 95,
  'Dressed as opposite gender poorly':1,
  'Dressed as opposite gender convincingly':1,
  'Androgynous':3
};

var raceQuirks = {
  'None':30,
  'Hates':15,
  'Loves':15,
  'Agressive towards':10,
  'Has a soft spot for':10,
  'Strongly suspicious of':10,
  'Racist towards':5,
  'Immune to persuation from':5
};

var backgrounds = [];
var firstNames = [];
var surnameone = [];
var surnametwo = [];

function loadBackgrounds(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data/backgrounds.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function loadNames(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data/names.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

loadBackgrounds(function(response) {
  // Parse JSON string into object
  backgrounds = JSON.parse(response).backgrounds;
});

loadNames(function(response) {
  // Parse JSON string into object
  var formattedResponse = JSON.parse(response);
  firstNames = formattedResponse.firstNames;
  surnameone = formattedResponse.surnameone;
  surnametwo = formattedResponse.surnametwo;
});



var getBackground = function(){
  return backgrounds[Math.floor(Math.random()*backgrounds.length)];
}

var getRace = function(isPlural){
  var race = weightedRandomizer(races);
  if(isPlural){
    return racesPlural[race];
  }else{
    return race;
  }
}

var getClass = function(){
  return classes[Math.floor(Math.random()*classes.length)];
}

var getGender = function(){
  return genders[Math.floor(Math.random()*genders.length)];
}

var getGenderBender = function(){
  return weightedRandomizer(genderBender);
}

var getRaceQuirk = function(){
  var quirk = weightedRandomizer(raceQuirks);
  //raceQuirks[Math.floor(Math.random()*raceQuirks.length)];
  if(quirk !== 'None'){
    quirk += ' ' +getRace(true);
  }
  return quirk;
}

var getName = function(){
  return firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' +surnameone[Math.floor(Math.random()*surnameone.length)] + surnametwo[Math.floor(Math.random()*surnametwo.length)];
}

function weightedRandomizer(data){
  // get total weight
  var totalWeight = 0;
  for (var key in data){
    totalWeight += data[key];
  }
  var randomNumber = Math.floor(Math.random() * totalWeight);
  for (var key in data){
    randomNumber -= data[key];
    if(randomNumber<0){
      return key;
    }
  }
}

var generateCharacter = function(){
  var background = getBackground()
  var data = {
    name: getName(),
    gender: getGender(),
    genderBender: getGenderBender(),
    race: getRace(false),
    predispositions: getRaceQuirk(),
    class: getClass(),
    backgroundType: background.title,
    description: background.description.replace(/\n\t/g,"<br>&emsp;&emsp;").replace(/\n/g, "<br />"),
    skillProficiencies: background.skillProficiencies,
    equipment: background.equipment,
    feature: background.feature,
    personalityTrait: background.personalityTrait[Math.floor(Math.random()*background.personalityTrait.length)],
    ideal: background.ideal[Math.floor(Math.random()*background.ideal.length)],
    bond: background.bond[Math.floor(Math.random()*background.bond.length)],
    flaw: background.flaw[Math.floor(Math.random()*background.flaw.length)],
  }
  console.log(data);
  document.getElementById('characterName').textContent = data.name +', the ' +data.gender +' ' +data.race +' ' + data.class;
  document.getElementById('classSymbol').src = 'img/common/DnD5e_ClassSymb_'+data.class+'.jpg';
  document.getElementById('background-type').textContent = data.backgroundType;
  document.getElementById('background-description').innerHTML = data.description;
  document.getElementById('background-skills').textContent = data.skillProficiencies;
  document.getElementById('background-equipment').textContent = data.equipment;
  document.getElementById('background-feature').textContent = data.feature;
  document.getElementById('background-trait').textContent = data.personalityTrait;
  document.getElementById('background-ideal').textContent = data.ideal;
  document.getElementById('background-bond').textContent = data.bond;
  document.getElementById('background-flaw').textContent = data.flaw;

  //build quirks string
  var compileQuirks = function(){
    var quirksList = '<ul>'
    if(data.genderBender !== 'None'){
      quirksList +='<li>' + data.genderBender + '</li>';
    }
    if(data.predispositions !== 'None'){
      quirksList +='<li>' + data.predispositions +'</li>';
    }
    quirksList +='</ul>';
    document.getElementById('background-quirks').innerHTML = quirksList;
  }
  compileQuirks();
}
