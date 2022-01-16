class Card {

    constructor(amount) {
        this.amount = amount;
        this.cards = ["0C", "0D", "0H", "0S"
            ,"2C", "2D", "2H", "2S"
            ,"3C", "3D", "3H", "3S"
            ,"4C", "4D", "4H", "4S"
            ,"5C", "5D", "5H", "5S"
            ,"6C", "6D", "6H", "6S"
            ,"7C", "7D", "7H", "7S"
            ,"8C", "8D", "8H", "8S"
            ,"9C", "9D", "9H", "9S"
            ,"AC", "AD", "AH", "AS"
            ,"JC", "JD", "JH", "JS"
            ,"KC", "KD", "KH", "KS"
            ,"QC", "QD", "QH", "QS"
        ];
    }

    loadNew() {
        let cardArr = [];
        for (let i = 0; i < this.amount; i++){
            let rng = Math.floor(Math.random() * this.cards.length);
            while (cardArr.includes(this.cards[rng])){
                rng = Math.floor(Math.random() * this.cards.length);
            }
            cardArr.push(this.cards[rng]);
        }
        return cardArr;
    }


}