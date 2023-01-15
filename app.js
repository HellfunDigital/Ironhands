let gameOver = false;

const player = {
  name: 'Player',
  health: 100,
  attack: function(target, attackType) {
    let damage = getRandomIntInclusive(10, 25);
    target.health -= damage;
    updateHealthBars();
    // logMessage(`${this.name} used ${attackType} and dealt ${damage} damage to ${target.name}`);
    logMessage(`${this.name} used ${attackType} and dealt ${damage} damage to ${target.name}`);
  }
};

const enemy = {
  name: 'Enemy',
  health: 100,
  attack: function(target, attackType) {
    let damage = getRandomIntInclusive(10, 25);
    target.health -= damage;
    updateHealthBars();
    // logMessage(`${this.name} used ${attackType} and dealt ${damage} damage to ${target.name}`);
    logMessage(`${this.name} used ${attackType} and dealt ${damage} damage to ${target.name}`);
  }
};

function checkDefeat(character) {
  if (character.health <= 0) {
    logMessage(`${character.name} has been defeated!`);
    gameOver = true;
    if (character === player) {
      document.querySelector('#game-over-loss').classList.remove('hidden');
    } else {
      document.querySelector('#game-over-win').classList.remove('hidden');
    }
  }
}

const attackButtons = document.querySelectorAll('.attack-button');
const playerHealthBar = document.querySelector('#player .character-health-bar .current-health');
const enemyHealthBar = document.querySelector('#enemy .character-health-bar .current-health');

for (let i = 0; i < attackButtons.length; i++) {
  attackButtons[i].addEventListener('click', function() {
    player.attack(enemy, this.innerHTML);
    enemy.attack(player, getRandomAttack());
    checkDefeat(player);
    checkDefeat(enemy);
  });
}

function getRandomAttack() {
  let attacks = ['Tsunami Wave', 'Void Rift', 'Arcane Blast', 'Flameburst'];
  let randomIndex = getRandomIntInclusive(0, attacks.length - 1);
  return attacks[randomIndex];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateHealthBars() {
  playerHealthBar.style.width = `${player.health}%`;
  enemyHealthBar.style.width = `${enemy.health}%`;

  if (player.health < 50) {
    playerHealthBar.classList.add('low-health');
  } else {
    playerHealthBar.classList.remove('low-health');
  }

  if (enemy.health < 50) {
    enemyHealthBar.classList.add('low-health');
  } else {
    enemyHealthBar.classList.remove('low-health');
  }

  if (gameOver) {
    playerHealthBar.classList.add('hidden');
    enemyHealthBar.classList.add('hidden');
  }
}

const resetButtonLoss = document.querySelector('#reset-button-loss');
const resetButtonWin = document.querySelector('#reset-button-win');

resetButtonLoss.addEventListener('click', resetGame);
resetButtonWin.addEventListener('click', resetGame);

function resetGame() {
  console.log("Reset button clicked");
  player.health = 100;
  enemy.health = 100;
  gameOver = false;
  document.querySelector('#game-over-loss').classList.add('hidden');
  document.querySelector('#game-over-win').classList.add('hidden');
  playerHealthBar.style.width = '100%';
  enemyHealthBar.style.width = '100%';
  playerHealthBar.classList.remove('hidden', 'low-health');
  enemyHealthBar.classList.remove('hidden', 'low-health');
}

document.getElementById('reset-button-loss').addEventListener('click', function() {
  document.getElementById('game-over-loss').classList.add('hidden');
  resetGameState();
});

document.getElementById('reset-button-win').addEventListener('click', function() {
  document.getElementById('game-over-win').classList.add('hidden');
  resetGameState();
});

function resetGameState() {
  // Reset the player and enemy's health
  document.querySelector('#player .current-health').style.width = '100%';
  document.querySelector('#enemy .current-health').style.width = '100%';

  // Reset any other game state, such as the player's attack power or the enemy's attack patterns
}

const battleLog = document.querySelector('#BattleLog');

function logMessage(message) {
  const battleLog = document.querySelector('#BattleLog');
  battleLog.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
  battleLog.scrollTop = battleLog.scrollHeight;
}
