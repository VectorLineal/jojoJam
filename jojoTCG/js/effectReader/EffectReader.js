import Character from "../cards/*";

export default function createDeck() {
    // Search cardsName in json, create Card Array, and return it
    var cardsCode = this.load.json(element, "assets/cards.json").cards;
    var cards = [];
    cardsCode.forEach(element => {
        cards.push(createCard(element));
    });
    return cards;
}

export default function createCard(cardJson) {
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
    var onTrigger = cardJson.effect.split('/');

    modTrigger(onTrigger[0], card, 0); // default
    modTrigger(onTrigger[1], card, 1); //
    modTrigger(onTrigger[2], card, 2);
    modTrigger(onTrigger[3], card, 3);
    modTrigger(onTrigger[4], card, 4);

    return card;
}

export default function modTrigger(utility, card, type) {

    // Divide effect with different targets/effects
    var code = utility.split(' ');

    code.forEach(usage => {
        //  Target-Effect^Duration`Effect2^Duration2 ...
        var target = usage.split('-')[0];
        var effects = usage.split('-')[1].split('`');

        effect.forEach(element => {
            var effect = element.split('^')[0];
            var duration = element.split('^')[1];
            duration = duration.charAt(0) = '@' ? -1 : parseInt(duration); // @ = -1 = Always

            modEffect(target, effect, duration, card, type);
        });
    });
}

export default function modEffect(target, effect, duration, card, type) {
    // read effect
    switch (effect.charAt(0)) {
        case 'D': // Deal Damage
            var amount = parseInt(effect.replace('D', ''));
            var newFunction = function () {
                var thisTarget = selectTarget(target); // *******Implement*******
                thisTarget.health -= amount;
            }
            break;
        case 'C': // Add Counter
            var attack = parseInt(effect.replace('D', '').split('.')[0]);
            var health = parseInt(effect.replace('D', '').split('.')[1]);
            var newFunction = function () {
                var thisTarget = selectTarget(target); // *******Implement*******
                thisTarget.effects.push({ "Health" : [health,duration]});
                thisTarget.effects.push({ "Attack" : [attack,duration]});
            }
            break;
        case 'A': // Set Attack
        case 'H': // Heal
        case 'P': // Protection
        case 'L': // Set health/Life

        case 'S': // Summon
        case 'B': // Battle
        case 'K': // Kill
        case 'W': // Wipe/Purge/Clean Effects
    }
}