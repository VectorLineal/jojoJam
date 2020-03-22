import Hero from "../cards/Hero.js";
import Item from "../cards/Item.js";
import Spell from "../cards/Spell.js";
import Minion from "../cards/Minion.js";

export default function createCardArray(cardsCode) {
    // Search cardsName in json, create Card Array, and return it
    //var cardsCode = this.load.json(element, "assets/cards.json").cards;
    var cards = [];
    cardsCode.forEach(element => {
        cards.push(createCard(element));
    });

    //console.log(cards)
    return cards;
}

function createCard(cardJson) {
    var card;
    switch (cardJson.type) {
        case 'Character':
            card = new Hero(cardJson.name, cardJson.color, cardJson.mana, cardJson.health);
            break;
        case 'Minion':
            card = new Minion(cardJson.name, cardJson.color, cardJson.mana, cardJson.health, cardJson.attack, cardJson.race);
            break;
        case 'Spell':
            card = new Spell(cardJson.name, cardJson.color, cardJson.mana);
            break;
        case 'Item':
            card = new Item(cardJson.name, cardJson.color, cardJson.mana);
            break;
    }

    // Divide Cards effect per Type of activation
    var onTrigger = cardJson.effects.split('/');

    modTrigger(onTrigger[0], card, 0); // default
    modTrigger(onTrigger[1], card, 1); // Summon
    modTrigger(onTrigger[2], card, 2); // Attack
    modTrigger(onTrigger[3], card, 3); // Kill
    modTrigger(onTrigger[4], card, 4); // End Turn

    return card;
}

function modTrigger(utility, card, type) {
    if (utility.length != 0) {
        // Divide effect with different targets/effects
        var code = utility.split(' ');

        code.forEach(usage => {
            //  Target-Effect^Duration`Effect2^Duration2 ...
            var target = usage.split('-')[0];


            var effects = usage.split('-')[1].split('`');

            effects.forEach(element => {
                var effect = element.split('^')[0];
                var duration = element.split('^')[1];
                duration = duration == null || duration.charAt(0) == '@' ? -1 : parseInt(duration); // @ = -1 = Always

                modEffect(target, effect, duration, card, type);
            });
        });
    }
}

function modEffect(target, effect, duration, card, type) {
    // read effect
    var newFunction;
    switch (effect.charAt(0)) {
        case 'D': // Deal Damage
            var amount = parseInt(effect.replace('D', ''));
            newFunction = function () {
                //var thisTarget = target == 'S'? card: selectTarget(target); // *******Implement*******
                var thisTarget = card;
                thisTarget.curHealth -= amount;
            }
            break;
        case 'C': // Add Counter
            var attack = parseInt(effect.replace('C', '').split('.')[0]);
            var health = parseInt(effect.replace('C', '').split('.')[1]);
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.effects.push({ "Health": [duration, health] });
                thisTarget.effects.push({ "Attack": [duration, attack] });
            }
            break;
        case 'A': // Set Attack
            var amount = parseInt(effect.replace('A', ''));
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.effects.push({ "Attack": [duration, amount] });
            }
            break;
        case 'H': // Heal
            var amount = parseInt(effect.replace('H', ''));
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.curHealth += amount;
                if (thisTarget.curHealth > thisTarget.maxHealth)
                    thisTarget.curHealth = thisTarget.maxHealth;
            }
            break;
        case 'P': // Protection/Shield
            var amount = parseInt(effect.replace('P', ''));
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.effects.push({ "Health": [duration, amount] });
            }
            break;
        case 'S': // Summon
        case 'B': // Battle
            newFunction = function () {
                //battle(card);
            }
            break;
        case 'K': // Kill
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.curHealth = 0;
            }
            break;
        case 'W': // Wipe/Purge/Clean Effects
            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                thisTarget.effects = []; // Wipe all Effects
                // *******Implement******* Bad Effects
            }
            break;


        case '*':
            newFunction = function () {
                if (target == 'S') var thisTarget = card;
                else var thisTarget = selectTarget(target);

                var effectName = effect.substring(1);
                thisTarget.effects.push({ [effectName]: [duration] });
            }
            break;

    }

    //console.log(card.name, type, newFunction);
    var oldFunction;

    switch (type) {
        case 0:
            if (target == 'S') { 
                var onDefault = function () {
                    newFunction.apply(newFunction);
                }
                onDefault();
            } else {
                oldFunction = card.onActivate;
                card.onActivate = function () {
                    oldFunction.apply(oldFunction);
                    newFunction.apply(newFunction);
                }
            }
            break;
        case 1:
            oldFunction = card.onSummon;
            card.onSummon = function () {
                oldFunction.apply(oldFunction);
                newFunction.apply(newFunction);
            }
            break;
        case 2:
            oldFunction = card.onAttack;
            card.onAttack = function () {
                oldFunction.apply(oldFunction);
                newFunction.apply(newFunction);
            }
            break;
        case 3:
            oldFunction = card.onDeath;
            card.onDeath = function () {
                oldFunction.apply(oldFunction);
                newFunction.apply(newFunction);
            }
            break;
        case 4:
            oldFunction = card.onKill;
            card.onKill = function () {
                oldFunction.apply(oldFunction);
                newFunction.apply(newFunction);
            }
            break;
        case 5:
            oldFunction = card.onEndTurn;
            card.onEndTurn = function () {
                oldFunction.apply(oldFunction);
                newFunction.apply(newFunction);
            }
            break;
    }
}

// {createCardArray, createCard, modTrigger, modEffect}