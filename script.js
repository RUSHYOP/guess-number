'use strict';

let randomNumber = Math.floor(Math.random() * 20 + 1);
const guessInput = document.querySelector('.guess');
const checkbutton = document.querySelector('.check');
const message = document.querySelector('.message');
const changescore = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const answerdisplay = document.querySelector('.number');
const playagain = document.querySelector('.btn.again');

let score = 0;
let numplays = 1;
checkbutton.addEventListener('click', () => {
  let inputvalue = Number(guessInput.value);
  if (randomNumber === inputvalue) {
    message.textContent = '🥳🎉Correct Number!';
    score++;
    changescore.textContent = String(score);
    answerdisplay.textContent = String(randomNumber);
    highscore.textContent = String(
      numplays == 1 ? score : Math.min(score, Number(highscore.textContent))
    );
    checkbutton.disabled = true;
    document.body.style.background = 'chartreuse';
  } else if (inputvalue < randomNumber && randomNumber - inputvalue > 5) {
    score++;
    message.textContent = '❌Too Low!';
  } else if (inputvalue > randomNumber && inputvalue - randomNumber > 5) {
    score++;
    message.textContent = '❌Too High!';
  } else if (inputvalue < randomNumber && randomNumber - inputvalue < 5) {
    score++;
    message.textContent = `👌You're near to it!(guess higher!)`;
  } else if (inputvalue > randomNumber && inputvalue - randomNumber < 5) {
    score++;
    message.textContent = `👌You're near to it!(guess lower!)`;
  }
});

playagain.addEventListener('click', () => {
  numplays += 1;
  answerdisplay.textContent = '?';
  changescore.textContent = '0';
  score = 0;
  checkbutton.disabled = false;
  message.textContent = 'Start guessing...';
  document.body.style.background = '#222';
});
