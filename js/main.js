const loadCardGame = () => {
  let scriptElement = document.createElement('script');
  scriptElement.setAttribute('type','text/javascript');
  scriptElement.setAttribute('src','js/CardGame.js');
  document.head.appendChild(scriptElement);
};

document.getElementById('cardGameLoadButton').addEventListener('click', function () {
    loadCardGame();
});