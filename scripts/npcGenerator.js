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

function NPCGenerator(sources, lodash){
  if(typeof _ === "undefined"){
    var _ = lodash;
  }
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
    'None':80,
    'Hates':15,
    'Loves':15,
    'Agressive towards':10,
    'Has a soft spot for':10,
    'Strongly suspicious of':10,
    'Racist towards':5,
    'Immune to persuation from':5
  };

  //personal quirks
  this.physicalQuirks = {
    'Always gets a sunburn':5,
    'Always stands with his or her hands behind their back, sometimes in an “at ease” position, though he/she was never in the military':5,
    'Can only hear out of one ear':5,
    'Can only see out of one eye':5,
    'Can’t stay clean; always dirty':5,
    'Cracks his/her neck all the time':5,
    'Drags his or her feet':5,
    'Drools when hungry/excited':5,
    'Foams at the mouth when excited/angry':5,
    'Has a limp':5,
    'Has a noticeable birthmark':5,
    'Has a noticeable burn scar':5,
    'Has a noticeable scar from a weapon':5,
    'Has a noticeable tattoo':5,
    'Has a piercing':5,
    'Has a very, very bushy mustache':5,
    'Has extremely hairy arms':5,
    'Has several hidden body piercings or tattoos that regular clothing conceal':5,
    'Has several parts of his or her body that are double jointed and bend or flex in an unnatural or uncanny manner':5,
    'Has vividly blue hair':5,
    'He has no beard':5,
    'He/she has allergies (to give more depth, give strong allergic reactions to the common nasty ones like nuts, bee stings, strawberries, pollen, cow’s milk, cats, horses, etc.)':5,
    'His/her feet are incredibly bad-smelling':5,
    'Incessantly cracks knuckles':5,
    'Is bald':5,
    'Is gassy':5,
    'Looks just like another character, or a famous figure of the day':5,
    'Profusely sweats even when at rest':5,
    "Puts hand on someone else’s hand/arm/shoulder/leg as much as possible when talking":5,
    'Sneezes extra loud':5,
    'Squints a lot':5,
    'Thrives in cold weather, hates warm weather':5,
    'Thrives in hot weather, hates cold weather':5,
    'Urinates frequently':5,
    'Walks as if he/she is afraid of being followed':5,
    'Walks as if he/she is in constant danger of being attacked':5,
  }
  //there should only be one of these else they contradict each other.
  this.vocalQuirksUnique = {
    '': 50, //nothing from this list
    'Uses big words to impress listeners':5,
    'Doesn’t talk much, and uses short simple words when he/she does speak':5,
    'Hesitates before speaking, always considers his/her words first':5,
    'Poor vocabulary, spelling, and grammar':5,
    'Never speaks unless spoken to':5,
    'Always answers a question with a question':5,
    'Mumbles or mutters instead of speaking clearly':5,
  }
  //a bunch of other random things about hey they converse.
  this.vocalQuirks = {
    'Has an accent (ex. irish brogue, french, russian)':5,
    'Sometimes speaks about himself/herself in 3rd person':5,
    'Mutters poetry under his/her breath':5,
    'Is susceptible to malapropisms (an act or habit of misusing words ridiculously, especially by the confusion of words that are similar in sound) or spoonerisms (an accidental transposition of initial consonant sounds or parts of words)':5,
    'Excessively uses initials or acronyms for common and uncommon phrases and doesn’t bother to explain them':5,
    'Compulsively interrupts people telling stories to interject facts about the story that he or she only knows because they have been told the story before, not because they were involved with it':5,
    'Makes up random lies about unimportant things for no reason (this could also be a mania.)':5,
    'Regularly mispronounces a certain word or uses redundant terms':5,
    'When stressed or lying, speaks from the corner of his or her mouth':5,
    'Mutters spells or curses under his/her breath':5,
    'Corrects people when they use colloquial speech':5,
    'Whistles':5,
    'Ends declarative sentences with an interrogative inflection?':5,
    'Is a mush mouth (ex. boomhauer of “king of the hill”)':5,
    'Makes noises like “pow!” or “whap!” while doing everyday things':5,
    'Talks very softly, especially when involved in major arguments':5,
    'Never uses contractions':5,
    'Calls everyone by a pet name (ex. babe, sweetie, doll)':5,
    'Repeats a common adage constantly (ex. never count your chickens before they’re hatched!)':5,
    'Often mixes up sayings (ex. never count your chickens until the fat lady sings!)':5,
    'In conversation, if a word has slipped his/her mind, he/she will stop to think of it and will not give up until he/she finally recalls the right word':5,
    'Distracted easily during conversation':5,
    'Puts hand on someone else’s hand/arm/shoulder/leg as much as possible when talking':5,
    'Often seems to go out of his way to answer the exact question that was asked of him instead what the questioner obviously meant':5,
    'Tells ”stories” with no point or conclusion':5,
    'Argues points with people who agree with him/her':5,
    'Is fond of malapropisms, or cannot help making them (ex. psychotic for psychic)':5,
    'Hates quiet pauses in conversations':5,
    'Taunts foes':5,
    'Laughs to himself/herself at intervals, for no apparent reason':5,
    'Affects a consumptive cough':5,
    'Always lets out an involuntary nervous laugh before talking':5,
    'Always laughs at his/her own jokes':5,
    'Likes to use metaphor in nearly every sentence':5,
    'Likes to make references to historical examples of a situation as much as possible':5,
    'Tells dirty jokes, even when not appropriate':5,
    'Stutters when excited':5,
    'Makes derogatory comments about people who aren’t there':5,
    'Voice gets higher when he/she drinks':5,
    'Talks to himself/herself':5,
    'Talks to inanimate objects':5,
    'Speaks without an discernible accent':5,
    'Constantly interrupts others':5,
    'Speaks with poetic flair':5,
    'Grunts for ”yes”, snarls for ”no”, shrugs for ”maybe”':5,
    'Cackles':5,
    'Talks about objects as if they were people':5,
    'Always gives the vaguest possible answer to questions':5,
    'Always speaks at far too high a volume':5,
    'Conversations always turns to a particular or peculiar topic (ex. cats)':5,
    'Always complains':5,
    'Always talks about his/her lost love':5,
    'Constantly tells jokes that aren’t funny':5,
    'Mispronounces names':5,
    'Calls all women “mother”':5,
    'Has difficulty answering a question directly':5,
    'Uses the word ”weasel” in conversation far too often.':5,
    'Rhymes peoples’ names: ”well, hello there, arthur-barthur! saw geno-jalapeno the other day, you know.”':5,
    'Always talks of ”the good old days”':5,
    'Always opens conversation on a new subject with the same phrase (ex. ”funny, i don’t know how i got to think of this, but…”)':5,
    'Swears at the least opportunity':5
  }

  this.backgrounds = [];
  this.firstNames = [];
  this.surnameone = [];
  this.surnametwo = [];

  this.getVocalQuirks = function(count){
    var quirkList =[];
    var uniqueVocalQuirk = weightedRandomizer(this.vocalQuirksUnique);
    if(uniqueVocalQuirk!=''){
      quirkList.push(uniqueVocalQuirk);
    }

    if(!count){
      count =1;
    }
    for(var i=0;i<count;i++){
      var quirk=weightedRandomizer(this.vocalQuirks);
      if(quirkList.indexOf(quirk)>-1){
        i--; //try again
      }else{
        quirkList.push(quirk);
      }
    }
    return quirkList;
  }

  this.getPhysicalQuirks= function(count){
    var quirkList =[];
    if(!count){
      count =1;
    }
    //get a unique vocal quirk
    for(var i=0;i<count;i++){
      var quirk=weightedRandomizer(this.physicalQuirks);
      if(quirkList.indexOf(quirk)>-1){
        i--; //try again
      }else{
        quirkList.push(quirk);
      }
    }
    return quirkList;
  }

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
    var data = {
      name: this.getName(),
      gender: this.getGender(),
      genderBender: this.getGenderBender(),
      race: this.getRace(false),
      predispositions: this.getRaceQuirk(),
      physicalQuirks: this.getPhysicalQuirks(Math.floor(Math.random()*5)),
      vocalQuirks: this.getVocalQuirks(Math.floor(Math.random()*3)),
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

    if(typeof background.extras !== 'undefined'){
      var extras = background.extras;
      var select = '';
      extras.forEach(function(extra, index){
        for(var section in extra){
          for(var substitute in extra[section]){
            select = extra[section][substitute][Math.floor(Math.random()*extra[section][substitute].length)];
            //search background[index] for '<substitute>' and replace with select.
            var replacestr = '\<'+substitute+'\>';
            data[section] = data[section].split(replacestr).join(select);
          }
        }
      });
    }

    _.merge(data, overrides);
    return data;
  };

  _.merge(this, sources);
}

if(typeof module !== "undefined" && module.exports){
  module.exports = NPCGenerator;
}
