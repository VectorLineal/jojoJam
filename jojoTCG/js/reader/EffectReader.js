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
            card = new Spell(cardJson.name, cardJson.color, cardJson.mana, cardJson.health, cardJson.attack);
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

    var thisTarget = target == 'S'? card : selectTarget(target);
    
    // read effect
    var newFunction;
    switch (effect.charAt(0)) {
        case 'D': // Deal Damage
            var amount = parseInt(effect.replace('D', ''));
            newFunction = function (thisTarget) {   // ThisTarget = Card    
                thisTarget.alterHealth(-amount);
            }
            break;
        case 'H': // Heal
            var amount = parseInt(effect.substring(1));
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.alterHealth(amount);
            }
            break;
        case 'P': // Protection/Shield
            var amount = parseInt(effect.substring(1));
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.addEffect("Health", duration, amount);
            }
            break;
        case 'C': // Add Counter
            effect = effect.substring(1);
            var attack = parseInt(effect.split('.')[0]);
            var health = parseInt(effect.split('.')[1]);
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.addEffect("Health", duration, health);
                thisTarget.addEffect("Attack", duration, health);
            }
            break;
        case 'A': // Set Attack
            var amount = parseInt(effect.substring(1));
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.addEffect("Attack", duration, amount);
            }
            break;
        case 'B': // Battle
            newFunction = function (thisTarget) { // ThisTarget = Card
                card.battle(thisTarget);
            }
            break;
        case 'K': // Kill
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.curHealth = 0;
                thisTarget.alterHealth(amount); // To Update
            }
            break;
        case 'W': // Wipe/Purge/Clean Effects
            newFunction = function (thisTarget) { // ThisTarget = Card
                thisTarget.effects = []; // Wipe all Effects
                // *******Implement******* Bad Effects
            }
            break;
        case 'S': // Summon
            var amount = parseInt(effect.substring(1));
            target = target.substring(1);
            target = target.substring(target.length - 1, target.length);

            newFunction = function (thisTarget) { // ThisTarget = Player
                thisTarget.generate(target);
            }
            break;
        case 'M':
            effect = effect.substring(1);
            switch (effect.charAt(0)) {
                case 'S': // Steal
                    newFunction = function (thisTarget) { // ThisTarget = Player
                        thisTarget.steal();
                    }
                    break;
                case 'C': // Take Control
                    newFunction = function (thisTarget) { // ThisTarget = Player
                        thisTarget.control();
                    }
                    break;
                case 'T': // Draw
                    var amount = parseInt(effect.substring(1));
                    newFunction = function (thisTarget) { // ThisTarget = Player
                        targetPlayer.draw();
                    }

                    break;
                case 'D': // Discard
                    newFunction = function (thisTarget) { // ThisTarget = Player
                        targetPlayer.discard();
                    }
                    break;
                case 'R': // Return to Hand
                    newFunction = function (thisTarget) { // ThisTarget = Player
                        targetPlayer.return();
                    }
                    break;
            }

            newFunction = function () {
                var thisTarget = card; // *******Implement*******
                // implement decks hand graveyard...
            }
            break;


        case '*':
            newFunction = function () {
                var effectName = effect.substring(1);
                thisTarget.addEffect([effectName], [duration], 0);
            }
            break;

    }

    //console.log(card.name, type, newFunction);
    var oldFunction;

    switch (type) {
        case 0: // On Default/ OnActivate
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