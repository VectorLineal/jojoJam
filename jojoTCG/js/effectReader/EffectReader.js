export default function createDeck (cardsName) {
    // Search cardsName in json, create Card Array, and return it

    cardsName.forEach(element => {
        this.load.json(element,"assets/effects.json");//Modificar


    });
}

export default function effects (code) {
    // Decode Json String to Card Effect

    //Detect Target
    
    //Detect Effect

}