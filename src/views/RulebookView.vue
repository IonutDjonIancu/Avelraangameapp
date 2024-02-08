<template>
  <div class="av-container column">
    <p>
      "In order to thrive in the world of Av'el'Raan (sometimes called Avelraan)
      you need to understand how the world is and how it works.
    </p>
    <p>
      You need to follow along the story line and lore to better understand its
      complex history, races, cultures and adverse geopolitics.
    </p>
    <p>
      All of these things have been heavily influenced by the planet's
      geography, geology and its host star, and especially its unique axis and
      rotation."
    </p>
    <!-- RULEBOOK -->
    <p style="text-decoration: underline; margin-top: 10px; font-weight: bold">
      Av'el'Raan Rulebook in no particular order
    </p>
    <p style="font-size: xx-small">
      new rules will be added on top, once they become available
    </p>
    <textarea
      style="text-align: left; padding: 0px; color: #2c3e50"
      rows="2"
      cols="150"
    >
        // Rules
        // the result of an arcane roll is the attacker's abstract * entity level + 10% of the roll difference
        // the result of a psionic roll is based on the purge level of the initiator, for a roll of 20 with 50% purge the result is 10, as well as for a roll of 20 with 150% purge the result is 30 
        // the game has implemented racism, meaning that some mechanics will work based on your race, not only on your social skills, i.e: merchants refusing to trade with you because you are an orc
        // at the end of combat, the spoils go to the party leader, the wealth is 40% taken by party leader, the rest is spread equal to the party members
        // fighting weaker opponents will not yield experience
        // end of round regenerates 20% lost resolve and 50% of lost mana for all combatants
        // laying traps does not break hide, but it does allow all enemies to roll a spot which can remove you from stealth if successful
        // laying traps with a lower resolve than 150 will reduce your roll by half
        // when you use hide, all enemies on battleboard roll a spot, you get 1 grade bonus to hide for the number of enemies present, and a 1* grade penalty to the number of friendlies already hidden
        // apothecary reduces resolve by 1 for the healer if resolve is higher or equal to 150, otherwise it will reduce the roll by a quarter for each 50 resolve under 150
        // attacks reduce resolve by 10 for the attacker and by 5 for the defender if resolve is higher or equal to 50, otherwise it will reduce the roll by half
        // casting reduces resolve by 5 for the caster if resolve is higher or equal to 100, otherwise it will reduce the roll by half, save vs casting does not reduce resolve for the defender
        // psionics is prevalent over arcane if the skills are equal when used by a character to roll for spellcasting
        // offensive actions reduce resolve by 10, defensive actions reduce it by 3 as your character will slowly run out of stamina
        // if you drop below 50 for offensive actions, or 30 for defensive actions, your roll will be reduced by half as your character is slowly reaching exhaustion
        // only the party lead can move to locations
        // elves and half-elves are immune to disease
        // party leads are automatically set up by the a character's worth, if a non-npc character joins the party with a higher worth, it will automatically assume leadership in a very medieval-feudal manner
        // provisions cost 2 wealth and can be bought from any market
        // social skill statically increases the money you get from a merchant when selling an item, and when buying items social skill decreases the cost
        // a 20 stat, skill or spot represents 100% effectiveness on the d20 dice, anything above will add extra grades to the roll (i.e: roll 17 (grade 5) with 20 (100%) skill equals a level 5 hit, roll 17 with 40 (200%) skill equals a level 10 hit
        // all character attributes (stats, assets and skills) have a certain limit beyond which they cannot be increased, although certain items and special skills break this limit. The exceptions are purge and mana which have no limit, and defense which is capped at 90
        // arena or tournaments do not reward levelup points, but you also don't lose your character or items if you are defeated
        // only offensive actions will reward levelup points
        // levelup gives: entitylevel + (0 deed pt., 1 stats pts., 2 assets pts., 3 skill pts) for every critical hit
        // levelup points allocation takes into account class likely skills as well as theirs influencing stats, meaning that a Warrior would increase his Combat skill much easier than Arcane
        // effort level includes quests from all its lower levels as well
        // during travelling, 1 party member consumes 1 food, for every effort grade failed, party consumes 1 additional food to travel per travel day per party member (unless otherwise specified by the game logic or heroic traits)
        // travel time is usually 20km per day, unless otherwise specified by other factors
        // worth increases by doing quests or by winning duels and tourneys
        // travel will consume a minimum of 1 food per party, 1 food costs around 10 crows of wealth
        // you will lose 10% of your remaining resolve during combat
        // once resolve reaches 0 a character is considered that it has received a mortal wound
        // resolve under a specific number gives penalties to rolls
        // martial tradition (rolling d20s) gives the chance of multiple critical hits, while common tradition (rolling d100) has only 1 chance of critical hit (meaning a d100 does not reroll)
        // res is reduced by 10 for offensive (attacking, casting spells, using psionics, setting traps) and 3 for defensive actions (defending, resisting spells, resisting psionics, hiding)
        // offensive traps can be set or hiding can be done during combat, but the entire enemy party can roll spots to see you or the traps
        // for the combat rolls, the skill shows how many d20s a character can roll - same like it is in board game pen
        // stats offer a flat bonus to rolls, the bigger the stats the stronger the base roll.
        // each natural 20 gives 2 stat points, 2 asset points, 10 skill points
        // assets increase differently per point
        // 90% is the maxim allowed Defense at any given time for most cultures
        // purge can go beyond 100%
        // both mages and psionists can counterspell
        // classes award 2 points for 1 point spent on likely and unlikely stats or skills
        // entity level helps level up
        // entity level multiplies the paperdoll resolve
        // a psionists roll output is proportional with its purge level (meaning, a roll of 10 with a purge of 50% will result in a roll of 5)
        // apothecary, psionics and arcane can heal
        // psionics and arcane heals are subject to purge resistance
        // apothecary only heals 30% of the roll
        // purge skill reduces your arcane spellcasting rolls by its percentage
        // 100% purge also gives you immunity to curses
        // purge affects your psionics roll, under 100% will give a penalty, over 100% will give a bonus
        // resting replenishes 10% of your lost resolve, and 20% or your lost mana
        // effort is a feat determined by different entity types and can be achieved by becoming a greater adventurer
        // effort represents the range of grades that you need to roll over for a successful roll
      
    </textarea>
    <!-- RACES & CULTURES -->
    <p style="text-decoration: underline; margin-top: 10px; font-weight: bold">
      Races, Cultures, Classes and Tradition
    </p>
    <textarea style="text-align: left; padding: 0px" rows="2" cols="150">
        // Races
            // Human
                Brought by the Triarii during the Seeding Event, humans and human cultures are the most widespread race on Avelraan, making up to about 75% of the total world population.
                Strength     = 5;
                Constitution = 5;
                Agility      = 5;
                Willpower    = 5;
                Perception   = 5;
                Abstract     = 5;
            // Elf
                Originally from the world of Ryxos, the elves arrived on Avelraan via the Great Cosmic Rift, a cataclysmic event that destroyed Ryxos and altered the world of Avelraan forever.
                Strength     = 2;
                Constitution = 7;
                Agility      = 15;
                Willpower    = 7;
                Perception   = 10;
                Abstract     = 10;
            // Dwarf
                Natives to the world of Avelraan, dwarves have existed since the Age of the Molten Stone.
                Strength     = 12;
                Constitution = 10;
                Agility      = 2;
                Willpower    = 10;
                Perception   = 3;
                Abstract     = 10;
            // Orc
                Afflicted race, believed to have been an elven race, tormented and tortured by the void ruptures during the Rift, the orcs exist on Avelraan since the Coming of the Elves.
                Strength     = 11;
                Constitution = 9;
                Agility      = 7;
                Willpower    = 2;
                Perception   = 9;
                Abstract     = 1;
        // Cultures
            // Humans
                // Danarian
                    One of the most ardent and brave human cultures, the Danarians have lived a life of almost constant war and amazing cultural achievements, in a land called Danar, located in the Southern hemisphere of Avelraan. 
                    // stats
                    public const int Strength     = 0;
                    public const int Constitution = 0;
                    public const int Agility      = 0;
                    public const int Willpower    = 0;
                    public const int Perception   = 0;
                    public const int Abstract     = 0;
                    // assets
                    public const int Resolve      = 5;
                    public const int Harm         = 0;
                    public const int Spot         = 0;
                    public const int Defence      = 0;
                    public const int Purge        = 0;
                    public const int Mana         = 0;
                    public const int Actions      = 1;  
                    // skills
                    public const int Melee        = 40;
                    public const int Arcane       = 10;
                    public const int Psionics     = 10;
                    public const int Hide         = -10;
                    public const int Traps        = 10;
                    public const int Tactics      = 10;
                    public const int Social       = 20;
                    public const int Apothecary   = 10;
                    public const int Travel       = 20;
                    public const int Sail         = 10;
            // Elves
                // Highborn
                    One of the first peoples of elves to have arrived on Avelraan during the Rift, proud and noble, citybuilders and warriors with the utmost hatred and disgust to anything else that is not either elvish or highborn by design.
                    // stats
                    public const int Strength     = 0;
                    public const int Constitution = 0;
                    public const int Agility      = 0;
                    public const int Willpower    = 10;
                    public const int Perception   = 0;
                    public const int Abstract     = 0;
                    // assets
                    public const int Resolve      = 10;
                    public const int Harm         = 0;
                    public const int Spot         = 50;
                    public const int Defence      = 0;
                    public const int Purge        = 0;
                    public const int Mana         = 40;
                    public const int Actions      = 2;   
                    // skills
                    public const int Melee        = 20;
                    public const int Arcane       = 40;
                    public const int Psionics     = 5;
                    public const int Hide         = 10;
                    public const int Traps        = 10;
                    public const int Tactics      = 10;
                    public const int Social       = 20;
                    public const int Apothecary   = 10;
                    public const int Travel       = -40;
                    public const int Sail         = -10;
            // Dwarves
                // Undermountain
                    One of the most stout and hardened dwarven cultures, the mountainlords are by far the most ancient civilization that resides in the great halls of the Pel'Ravan mountains.
                    // stats
                    public const int Strength     = 10;
                    public const int Constitution = 10;
                    public const int Agility      = 0;
                    public const int Willpower    = 0;
                    public const int Perception   = 0;
                    public const int Abstract     = 0;
                    // assets
                    public const int Resolve      = 20;
                    public const int Harm         = 10;
                    public const int Spot         = 0;
                    public const int Defense      = 10;
                    public const int Purge        = 10;
                    public const int Mana         = 0;
                    public const int Actions      = 1;    
                    // skills
                    public const int Melee        = 30;
                    public const int Arcane       = 0;
                    public const int Psionics     = 10;
                    public const int Hide         = -20;
                    public const int Traps        = 10;
                    public const int Tactics      = 10;
                    public const int Social       = -5;
                    public const int Apothecary   = 0;
                    public const int Travel       = -20;
                    public const int Sail         = -100;
            // Orcs
                // Greenskin
                    The most common and widespread orcish culture. Devastating and destructive in nature, although the most humane in comparison with a plethora of evil manifestations that reside on Avelraan.
                    // stats
                    public const int Strength     = 0;
                    public const int Constitution = 0;
                    public const int Agility      = 0;
                    public const int Willpower    = 0;
                    public const int Perception   = 10;
                    public const int Abstract     = 0;
                    // assets
                    public const int Resolve      = 0;
                    public const int Harm         = 20;
                    public const int Spot         = 10;
                    public const int Defense      = 0;
                    public const int Purge        = 0;
                    public const int Mana         = 0;
                    public const int Actions      = 1;   
                    // skills
                    public const int Melee        = 10;
                    public const int Arcane       = 0;
                    public const int Psionics     = 0;
                    public const int Hide         = 10;
                    public const int Traps        = 10;
                    public const int Tactics      = 0;
                    public const int Social       = 0;
                    public const int Apothecary   = 20;
                    public const int Travel       = 40;
                    public const int Sail         = -100;
        // Classes
            // Warrior
                Masterful men-at-arms, clad in formidable armor, wielding deadly weapons, and excelling with unwavering loyalty the close-quarters combat.
                Likely stats, assets and skills:
                    Strength,
                    Constitution,
                    Willpower,
                    Resolve,
                    Harm,
                    Defense,
                    Melee,
                    Travel.
            // Mage
                Spellcasters that harness mystic energies, casting powerful spells to shape reality and unravel arcane mysteries in a world of ancient wonders and perilous secrets.
                Likely stats, assets and skills:
                    Abstract,
                    Constitution,
                    Mana,
                    Actions,
                    Arcane,
                    Travel,
                    Apothecary,
                    Social.
            // Hunter
                Skilled trackers, proficient in ranged weaponry and wilderness survival, adept at stalking prey and navigating treacherous landscapes with cunning precision.
                Likely stats, assets and skills:
                    Constitution,
                    Agility,
                    Perception,
                    Resolve,
                    Harm,
                    Spot,
                    Melee,
                    Travel,
                    Traps,
                    Hide.
            // Swashbuckler
                Dashing swordsmen, blending grace with deadly skill, mastering acrobatics and charm to outmaneuver foes in thrilling duels and daring escapades.
                Likely stats, assets and skills:
                    Agility,
                    Abstract,
                    Willpower,
                    Harm,
                    Defense,
                    Mana,
                    Melee,
                    Social,
                    Travel.
            // Sorcerer
                Commanding primal forces, weaving potent spells with innate magic, shaping reality with raw power and tapping into the depths of arcane mysteries.
                Likely stats, assets and skills:
                    Constitution,
                    Abstract,
                    Mana,
                    Actions,
                    Arcane.
        // Tradition
            // Martial
                The martial tradition is for those that belong to societies that have specialized in warfare during thousands of years of evolution.
                This will influence your presence when you travel Avelraan as well as interacting with other NPCs.
                Martials roll with a d20, and have unlimited consecutive rolls if the roll a critical hit, which is a 20 on the die cast.
            // Common
                The common tradition covers for most of the populations of Avelraan and represents a steady and long-lasting lifestyle more conservative in nature.
                Common traditions are known to be quite old and not as rigurous as martial societies.
                Commons roll with a d100, they are limited to a single critical hit, no further rerolls.
        </textarea
    >
    <!-- STATS & ASSETS FORMULAE -->
    <p style="text-decoration: underline; margin-top: 10px; font-weight: bold">
      Stats, Assets, Skills and Formulae
    </p>
    <textarea style="text-align: left; padding: 0px" rows="2" cols="150">
        // Stats
            Strength: represents the raw power of a character and its actual size (STR)
            Constitution: is the overall resilience and stamina and how much a character can endure both physically and mentally (CON)
            Agility: shows the speed prowess and flexibility of a character (AGI)
            Willpower: the determination of a character, the power to endure at any costs (WIL)
            Perception: hand eye coordination, as well as other natural senses (PER)
            Abstract: the ability of a character to comprehend complex scenarios and arcane (ABS)
        // Assets
            Resolve: the overall score before a character falls (2STR + 3CNS + AGI + 2WIL + PER + ABS) (RES)
            Harm: the physical damage a character can cause (2STR + AGI + PER) (HAR)
            Spot: the reflex to react fast and rapidly (3PER + AGI) (MAN)
            Defense: the percentage of how much physical damage a character can ignore (2CNS + AGI + PER) (DEF)
            Purge: the percentage of how much magical damage a character can ignore, it also increases Psionic rolls (2WIL + CON + PER) (PUR)
            Mana: the energy that a character can spend during non-physical actions (2CON + 3ABS) (MAN)
            Actions: how many actions a character can take during one turn (RES / 100) (ACT)
        // Skills
            Melee: the sum total of ranged attacks, running, positioning, hand to hand combat, close quarters and prowess during combat (STR + CON + AGI)    
            Arcane: spellcasting (ABS + WIL + CON)
            Psionics: energy discharges and telekinesis (2WIL + CON)
            Hide: the rare gift to disappear entirely (2AGI + PER + ABS - STR)
            Traps: the ability to set harmful distractions (2ABS + PER)       
            Tactics: the acumen and command of large groups of individuals to gain a favorable outcome before, during or after a battle (3*ABS)
            Social: the skill to persuade, discuss, debate or barter (PER + ABS + WIL)
            Apothecary: first aid and the physician's skill to mend or treat various wounds and illnesses (ABS + PER + CON)
            Travel: the speed at which you can cross country and spatial awareness (2CON + AGI + WIL - STR)
            Sail: the skill to sail ships as well to survive at sea, rivers or lakes (2CON + ABS)      
    </textarea>
  </div>
</template>

<style scoped>
li {
  font-size: small;
}

p {
  margin: 0px;
}
</style>
