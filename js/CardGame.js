let cardGame;
let highscore;
let cards;
let timer;
let bonusSec = 0;
let tmpMax;
let scoreToggle = false;

const checkTime = () => {


    let timeLeft = (highscore.maxSecond  - highscore.checkTime());
    if (timeLeft > 0){
        if (tmpMax < highscore.maxSecond){
            document.getElementById('timerHeader').innerHTML = "Time left: " + (highscore.maxSecond  - highscore.checkTime())
                + ' + ' + highscore.bonusSecond + 's';
            tmpMax = highscore.maxSecond;
        }
        else {
            document.getElementById('timerHeader').innerHTML = "Time left: " + (highscore.maxSecond  - highscore.checkTime());


        }

    }
    else {
        document.getElementById('timerHeader').innerHTML = "Time left: " + (highscore.maxSecond  - highscore.checkTime());
        clearInterval(timer);
        alert("Your time is up!\n" +
            "Your score: " + highscore.score);
        stopGame();
    }

};



const startGame = () => {

    //debugger;
    if (document.getElementById('Username').value !== ''){

        document.getElementById("scoreboardButton").style.display = "none";
        timer = window.setInterval(checkTime, 1000);
        const amount = parseInt(document.getElementById('Amount').value);
        const userName = document.getElementById('Username').value;
        userName.trim();
        if (amount === 3){
            bonusSec = 1;
        }
        else if (amount === 7){
            bonusSec = 2;
        }
        else if (amount === 9){
            bonusSec = 3;
        }

        cardGame = new Card(amount);
        //console.log(cardGame.loadNew());
        highscore = new Highscore(userName,bonusSec);
        tmpMax = highscore.maxSecond;

        document.getElementById('UsernameSelection').innerHTML = '<h2>Username: ' + highscore.username + '</h2>';
        document.getElementById('AmountSelection').innerHTML = '<h2>Amount: ' + cardGame.amount + '</h2>';
        document.getElementById('GameButton').setAttribute('onclick', 'stopGame();clearInterval(timer);');
        document.getElementById('GameButton').innerHTML = 'Stop game';
        document.getElementById('scoreHeader').innerHTML = 'Score: ' + highscore.score;


        updateGame();
    }
    else {
        alert('Please enter a username!');
    }





};

const updateGame = () => {

    cards = cardGame.loadNew();

    //console.log(cards);
    //document.getElementById('mainCard').textContent = '';
    //document.getElementById('card').textContent = '';
    clearMainContent();

    //Set main card in Highscore class to check if the user selects the correct card.
    highscore.setMainCard(cards[0]);

    //Display main card depending on the game mode.
    document.getElementById("mainContent").innerHTML = "<section id='mainCard'></section>";

    if (parseInt(cardGame.amount) === 3){
        document.getElementById('mainCard').innerHTML += '<article> </article><article><img id="main' + cards[0] + '"' +
            'src="img/card/' + cards[0] + '.svg" alt="mainCard"></article><article> </article>';
    }
    else if (parseInt(cardGame.amount) === 7){
        document.getElementById('mainCard').innerHTML += '<article> </article><article> </article><article> </article><article><img id="' + cards[0] + '"' +
            'src="img/card/' + cards[0] + '.svg" alt="mainCard"></article><article> </article><article> </article><article> </article>';
    }
    else if (parseInt(cardGame.amount) === 9){
        document.getElementById('mainCard').innerHTML += '<article> </article><article> </article><article> </article><article> </article><article><img id="' + cards[0] + '"' +
            'src="img/card/' + cards[0] + '.svg" alt="mainCard"></article><article> </article><article> </article><article> </article><article> </article>';
    }


    document.getElementById("mainContent").innerHTML += '<section id="card"></section>';
    let usedCard = [];
    for (let i = 0;i < cards.length;i++){
        let card = Math.floor(Math.random() * cards.length);
        while (usedCard.includes(cards[card])){
            card = Math.floor(Math.random() * cards.length);
        }
        document.getElementById('card').innerHTML += '<article><img class="guess" id="' + cards[card] + '" src="img/card/' + cards[card] +
            '.svg" alt="cards"></article>';
        usedCard.push(cards[card])
    }
    document.getElementById('scoreHeader').innerHTML = 'Score: ' + highscore.score + ' | Combo: ' + highscore.combo;
    let cardsElement = document.getElementsByClassName('guess');
    //console.log(cardsElement);
    for (let i = 0;i < cardsElement.length;i++){
        cardsElement[i].addEventListener('click', function(){
            highscore.checkClickedCard(cardsElement[i].id);
            updateGame();
        });
    }


};

const stopGame = () => {

    localStorage.setItem(highscore.username,highscore.score);
    clearMainContent();
    document.getElementById("scoreboardButton").style.display = "block";
    document.getElementById('scoreHeader').innerHTML = 'Reaction trainer';
    document.getElementById('timerHeader').innerHTML = 'Good luck!';
    document.getElementById('GameButton').setAttribute('onclick', 'startGame();');
    document.getElementById('GameButton').innerHTML = 'Enter';
    document.getElementById('UsernameSelection').innerHTML = '<label for="Username">Username:</label>\n' +
        '<input id="Username" type="text" name="DATA_username" value="' + highscore.username + '">';
    document.getElementById('AmountSelection').innerHTML = '<label id="AmountLabel" for="Amount">Please input the amount of cards that you want to be shown.</label>\n' +
        '<select id="Amount" name="DATA_amount">\n' +
        '    <option value="3">3</option>\n' +
        '    <option value="7">7</option>\n' +
        '    <option value="9">9</option>\n' +
        '</select>';
};

const toggleScoreBoard = () => {

    if (localStorage.length > 0){
        if (scoreToggle === false){
            scoreToggle = true;

            let scores = [];

            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                scores[i] = {name: key, score: localStorage.getItem(key)};
            }
            scores = scores.sort(function (a,b) {
                return a.score - b.score;
            });

            let scoreBoard = '<table>';
            scoreBoard += '<thead>';
            scoreBoard += '<tr>';
            scoreBoard += '<th scope="col">Username</th>';
            scoreBoard += '<th scope="col">Score</th>';
            scoreBoard += '</tr>';
            scoreBoard += '</thead>';
            scoreBoard += '<tbody>';
            for (let i = 0; i < scores.length;i++){
                scoreBoard += "<tr><td>" + scores[i]['name'] + " </td>" + "<td>" + scores[i]['score'] + " Points</td></tr>";
            }
            scoreBoard += '</tbody>';
            scoreBoard += '</table>';
            document.getElementById("mainContent").innerHTML = scoreBoard;
        }
        else if (scoreToggle){
            scoreToggle = false;
            clearMainContent();
        }
    }
    else {
        clearMainContent();
        alert("No score yet!\n" +
            "You need to play a game first.");
    }

};

const clearMainContent = () => {
    document.getElementById("mainContent").textContent = "";
};













