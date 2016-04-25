/*
 * NPC Generator
 * Exposes a Generator which generates an NPC on demand
 * Encapsulates all NPC generation functionality
 */

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

 function NPCGenerator(sources){

   //race
   this.races = {
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

   this.racesPlural ={
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

   //class
   this.classes = ['Barbarian','Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

   //gender
   this.genders = ['Male', 'Female'];
   this.genderBender = {
     'None': 95,
     'Dressed as opposite gender poorly':1,
     'Dressed as opposite gender convincingly':1,
     'Androgynous':3
   };

   //race
   this.raceQuirks = {
     'None':30,
     'Hates':15,
     'Loves':15,
     'Agressive towards':10,
     'Has a soft spot for':10,
     'Strongly suspicious of':10,
     'Racist towards':5,
     'Immune to persuation from':5
   };

   this.backgrounds = [];
   this.firstNames = [];
   this.surnameone = [];
   this.surnametwo = [];

   this.getBackground = function(){
     return this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
   };

   this.getRace = function(isPlural){
     var race = weightedRandomizer(this.races);
     if(isPlural){
       return this.racesPlural[race];
     }else{
       return race;
     }
   };

   this.getClass = function(){
     return this.classes[Math.floor(Math.random()*this.classes.length)];
   };

   this.getGender = function(){
     return this.genders[Math.floor(Math.random()*this.genders.length)];
   };

   this.getGenderBender = function(){
     return weightedRandomizer(this.genderBender);
   };

   this.getRaceQuirk = function(){
     var quirk = weightedRandomizer(this.raceQuirks);
     //raceQuirks[Math.floor(Math.random()*raceQuirks.length)];
     if(quirk !== 'None'){
       quirk += ' ' +this.getRace(true);
     }
     return quirk;
   };

   this.getName = function(){
     return this.firstNames[Math.floor(Math.random()*this.firstNames.length)] + ' ' +this.surnameone[Math.floor(Math.random()*this.surnameone.length)] + this.surnametwo[Math.floor(Math.random()*this.surnametwo.length)];
   };

   this.generateCharacter = this.generate; //alias for compatibility
   this.generate = function(overrides){

     var background = this.getBackground();
     if(typeof background.extras !== 'undefined'){
       var extras = background.extras;
       var select = '';
       extras.forEach(function(extra, index){
         for(var section in extra){
           for(var substitute in extra[section]){
             select = extra[section][substitute][Math.floor(Math.random()*extra[section][substitute].length)];
             //search background[index] for '<substitute>' and replace with select.
             var replacestr = '\<'+substitute+'\>';
             background[section] = background[section].replace(replacestr, select);
           }
         }
       });
     }
     var data = {
       name: this.getName(),
       gender: this.getGender(),
       genderBender: this.getGenderBender(),
       race: this.getRace(false),
       predispositions: this.getRaceQuirk(),
       class: this.getClass(),
       backgroundType: background.title,
       description: background.description.replace(/\n\t/g,"<br>&emsp;&emsp;").replace(/\n/g, "<br />"),
       skillProficiencies: background.skillProficiencies,
       equipment: background.equipment,
       feature: background.feature,
       personalityTrait: background.personalityTrait[Math.floor(Math.random()*background.personalityTrait.length)],
       ideal: background.ideal[Math.floor(Math.random()*background.ideal.length)],
       bond: background.bond[Math.floor(Math.random()*background.bond.length)],
       flaw: background.flaw[Math.floor(Math.random()*background.flaw.length)],
     };

    _.merge(data, overrides);
    return data;
  };

  _.merge(this, sources);
 }
