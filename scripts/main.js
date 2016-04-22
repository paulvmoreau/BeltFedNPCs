var generator = new NPCGenerator();

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
