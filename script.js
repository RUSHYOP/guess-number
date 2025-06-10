'use strict';

//button objects
const checkbutton = document.querySelector('.check');
const playagain = document.querySelector('.btn.again');
const guessInputElement = document.querySelector('.guess'); // reference to input field

//random number generator
const randomNumber = () => Math.floor(Math.random() * 20 + 1);

//input of guessed number
const guessInput = () => Number(guessInputElement.value);

//displaying result of guess
const message = message =>
  (document.querySelector('.message').textContent = message);

//score updater
const changescore = score =>
  (document.querySelector('.score').textContent = score);

//highscore updater
const highscore = value => {
  document.querySelector('.highscore').textContent = value;
};

//revealing number
const answerdisplay = value =>
  (document.querySelector('.number').textContent = value);

//background color updater
const background = value => (document.body.style.background = value);

let game = {
  score: 0,
  plays: 1,
  currentrandomvalue: randomNumber(),
  currenthighscore: 0,
};

//disable and enable button
function toggle(button) {
  button.disabled = !button.disabled;
}

//guess logic
function handleGuess() {
  let inputvalue = guessInput();
  if (isNaN(inputvalue) || inputvalue < 1 || inputvalue > 20) {
    message('⚠️ Please enter a number between 1 and 20!');
    return;
  }

  if (game.currentrandomvalue === inputvalue) {
    message('🥳🎉Correct Number!');
    game.score++;
    changescore(20 - game.score);
    answerdisplay(game.currentrandomvalue);
    game.currenthighscore = Math.max(game.score, game.currenthighscore);
    highscore(game.currenthighscore);
    toggle(checkbutton);
    background('#2f5600');
  } else if (
    inputvalue < game.currentrandomvalue &&
    game.currentrandomvalue - inputvalue > 5
  ) {
    game.score++;
    message('❌Too Low!');
  } else if (
    inputvalue > game.currentrandomvalue &&
    inputvalue - game.currentrandomvalue > 5
  ) {
    game.score++;
    message('❌Too High!');
  } else if (
    inputvalue < game.currentrandomvalue &&
    game.currentrandomvalue - inputvalue < 5
  ) {
    game.score++;
    message(`👌You're near to it!(guess higher!)`);
  } else if (
    inputvalue > game.currentrandomvalue &&
    inputvalue - game.currentrandomvalue < 5
  ) {
    game.score++;
    message(`👌You're near to it!(guess lower!)`);
  }
}

// button click listener
checkbutton.addEventListener('click', handleGuess);

// enter key listener on input field
guessInputElement.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleGuess();
  }
});

//new game listener
playagain.addEventListener('click', () => {
  game.plays += 1;
  game.currentrandomvalue = randomNumber();
  answerdisplay('?');
  changescore('0');
  game.score = 0;
  toggle(checkbutton);
  message('Start guessing...');
  background('#222');
});
