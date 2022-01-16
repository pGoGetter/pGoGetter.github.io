class Highscore {

    constructor(username, sec) {
        this.username = username;
        this.score = 0;
        this.startTime = Date.now();
        this.maxSecond = 20;
        this.bonusSecond = sec;
        console.log('SEC' + sec);
        console.log(typeof sec);
        this.combo = 0;
    }

    setMainCard(id){
        this.mainCard = id;
        //console.log(this.mainCard);
    }


    checkCombo(){

        if (this.combo % 5 === 0){
            //debugger;
            console.log(this.maxSecond + this.bonusSecond);
            this.maxSecond = this.maxSecond + this.bonusSecond;
            this.bonusSecond++;
        }
    }

    setProgress(scored){
        //debugger;
        if (this.score === 0){
            if (scored === true){
                ++this.score;
                ++this.combo;
                this.checkCombo();
                console.log('CORRECT :' + this.score);
            }
        }
        else {
            if (scored === true){
                ++this.score;
                ++this.combo;
                this.checkCombo();
                console.log('CORRECT :' + this.score);
            }
            else {
                --this.score;
                this.combo = 0;
                this.bonusSecond = 1;
                console.log('WRONG :' + this.score);
            }
        }

    }


    checkTime()  {

        const secondsElapsed = Math.floor((Date.now() - this.startTime) / 1000);

        return secondsElapsed;
    }

    checkClickedCard(id){
        //console.log(id);
        //debugger;
        if (id === this.mainCard){
            this.setProgress(true);
        }
        else {
            this.setProgress(false);
        }
    }




}