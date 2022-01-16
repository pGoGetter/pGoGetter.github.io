
alert('test');

const loadCardGame = () => {
  let cardGameElement = document.createElement('script');
  let highscoreElement = document.createElement('script');
  let cardElement = document.createElement('script');

    cardGameElement.setAttribute('type','text/javascript');
    cardGameElement.setAttribute('src','js/CardGame.js');

    highscoreElement.setAttribute('type','text/javascript');
    highscoreElement.setAttribute('src','js/Highscore.js');

    cardElement.setAttribute('type','text/javascript');
    cardElement.setAttribute('src','js/Card.js');

    document.head.appendChild(cardGameElement);
    document.head.appendChild(highscoreElement);
    document.head.appendChild(cardElement);
};

document.getElementById('cardGameLoadButton').addEventListener('click', function () {
  alert('test');
    loadCardGame();
});