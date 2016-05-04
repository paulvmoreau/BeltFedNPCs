var generator = null;
var additionalData = {};
load();

function getJSON(url, cb){
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType('application/json');
  xhttp.open('GET', url, true);
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == '200') {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      var json = null;
      try {
        json = JSON.parse(xhttp.responseText);
      } catch(e) {
        console.log('Error getting remote JSON', e);
        return cb(null, e);
      }
      return cb(json, null);
    }
  };
  xhttp.send(null);
}

function loadAdditionalData(cb){
  getJSON('data/backgrounds.json', function(backgrounds, err){
    additionalData.backgrounds = backgrounds;
    getJSON('data/names.json', function(names, err){
      _.merge(additionalData, names);
      return cb(true, false);
    });
  });
}

function load(){
  var genBtn = document.getElementById('generateCharacterBtn');
  genBtn.disabled = true;
  loadAdditionalData(function(){
    generator = new NPCGenerator(additionalData, _);
    genBtn.disabled = false;
  });
}

function generateCharacter(){
  var data = generator.generate();

  document.getElementById('characterName').textContent = data.name +', the ' +data.gender +' ' +data.race +' ' + data.class;
  document.getElementById('classSymbol').src = 'img/common/DnD5E_ClassSymb_'+data.class+'.jpg';
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
  function compileQuirks(){
    var quirksList = '<ul>';
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
