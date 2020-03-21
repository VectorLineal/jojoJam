export default class Minion{
    constructor(name, color, cost, attack, effect){
        constructor(name, color, cost, maxHealth, attack, effect)
            super(name, color, cost);
            this.maxHealth = maxHealth;
            this.curHealh = this.maxHealth;
            this.attack = attack;
            this.effects = [];
    }

    onSummon(){

    }
    onAttack(){
        
    }
    onDeath(){

    }
    onEndTurn(){
        
    }
}