export default class Deck{
    constructor(cards){
        this.cards = cards;
    }

    contains(value){
        return this.cards.includes(value);
    }

    randomInt(begin, end){
        return Math.floor(Math.random()*(end-begin+1)) + begin;
    }

    draw(){
        return this.cards.pop();
    }

    isEmpty(){
        return this.cards.length == 0;
    }

    randomListPermutations(){
        swaps = randomInt(this.cards.length, 2 * this.cards.length);
        numbers = [];
        for (var i = 0; i < this.cards.length; i++){
            numbers.push(x);
        }

        for (var j = 0; j < this.cards.length; j++){
            var pos1 = randomInt(0, this.cards.length-1);
            var pos2 = randomInt(0, this.cards.length-1);
            var temp = numbers[pos1];
            numbers[pos1] = numbers[pos2];
            numbers[pos2] = temp;
        }
        
        return numbers;
    }

    suffle(){
        var randomList = this.randomListPermutations();
        for (var j = 0; j < randomList.length; j++){
            var temp = this.cards[j];
            this.cards[j] = this.cards[randomList[j]];
            this.cards[randomList[j]] = temp;
        }
    }
}