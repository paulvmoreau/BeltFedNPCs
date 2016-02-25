# BeltFedNPCs
Used to quickly generate NPC's with backgrounds and quirks.<br>
NPC is also given a random class and race. Weighted random is used to balance the frequency of race occurances, favoring humans to appear the most. <br>
Program pulls data from names.json and backgrounds.json. <br>
First name is pulled from a json object found in names.json. Feel free to add more to the list, but I would avise <br>
to keep them gender neutral.<br>
Last name is randomly generated from two arrays found in names.json. feel free to add to the lists as you wish.<br>  
I plan on adding more quirks and maneurisms as I go, but if you have any ideas then that would be great as well. <br>
I also plan on developing a precompiler that would allow for each background to exist as it's own json file that <br>
get collected together into a single file at compile.<br>
<br>
<br>
Format for adding additional backgrounds to the backgrounds.json file:<br>
{<br>
      "title": "Background Title",<br>
      "description": "The introductory paragraph on the background. You can insert variable extras here by inserting <exampletag> and then including exampletag choices in the extras section. <otherexample>",<br>
      "skillProficiencies": [<br>
        "for now, this is text only"<br>
      ],<br>
      "Tool Proficiencies": ["Again, this will simply output whatever text is here"],<br>
      "languages": [<br>
        "this will output the text"<br>
      ],<br>
      "extras": [<br>
        {<br>
          "description": {<br>
            "exampletag":[<br>
              "Place a list here of random items you want to insert into <exampletag>.",<br>
              "Because the parent of this object is named description, the program will find/replace for <exampletag> in description only.",<br>
              "For now, the program does not do weighted random on these items",<br>
              "Make sure your description has the right spacing before and after <exampletag> or it will look weird."<br>
            ],<br>
            "otherexample":[<br>
              "keep in mind that the tags are case sensitive",<br>
              "but you should be able to write any text for your tags as they will be replaced prior to being put on the page",<br>
              "make sure you use unique tags or I cannot guarantee expected behavior"<br>
            ]<br>
          }<br>
        }<br>
      ],<br>
      "equipment": "text only for now",<br>
      "feature": "text only for now",<br>
      "personalityTrait": [<br>
        "Place any number of possible traits here",<br>
        "One will be selected at random",<br>
        "be creative, but the program will only pick one"<br>
      ],<br>
      "ideal": [<br>
        "Place any number of possible ideals here",<br>
        "One will be selected at random",<br>
        "be creative, but the program will only pick one",<br>
        "be sure to include alignment as needed",<br>
      ],<br>
      "bond": [<br>
        "Place any number of possible traits here",<br>
        "One will be selected at random",<br>
        "be creative, but the program will only pick one"<br>
      ],<br>
      "flaw": [<br>
        "Place any number of possible traits here",<br>
        "One will be selected at random",<br>
        "be creative, but the program will only pick one"<br>
      ],<br>
      "credit": "If you did not write this background. Please credit the creator here. Also, please avoid using lisenced backgrounds that you do not have rights to publish. you can also credit yourself here if you did create this background."<br>
    }<br>

