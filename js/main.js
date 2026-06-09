// ===== MAIN ENTRY POINT AND EVENT HANDLING =====

let animationId = null;
let gameStateChange = 'mainMenu';

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    uiManager.populateCharacterSelection();
    uiManager.updateSettingsUI();
    setupEventListeners();
    startGameLoop();
});

// ===== MAIN MENU EVENTS =====
document.getElementById('playBtn').addEventListener('click', () => {
    uiManager.showScreen('characterSelection');
});

document.getElementById('battleBtn').addEventListener('click', () => {
    uiManager.showScreen('battleScreen');
    setupBattleMode();
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    uiManager.showScreen('settingsScreen');
});

// ===== CHARACTER SELECTION EVENTS =====
document.getElementById('backCharBtn').addEventListener('click', () => {
    uiManager.showScreen('mainMenu');
});

// Add play button to character selection when a character is selected
document.getElementById('characterSelection').addEventListener('click', (e) => {
    if (e.target.closest('.character-card')) {
        // After a short delay, start the game
        setTimeout(() => {
            startGame();
        }, 300);
    }
});

function startGame() {
    gameState.startGame();
    gameInstance = new Game();
    gameInstance.init(gameState.selectedCharacter);
    uiManager.showScreen('gameScreen');
}

// ===== GAME SCREEN EVENTS =====

// Pause button (P key or ESC)
document.addEventListener('keydown', (e) => {
    if ((e.key === 'p' || e.key === 'P' || e.key === 'Escape') && gameState.gameRunning && !gameState.gameOver) {
        gameState.pauseGame();
        if (gameState.isPaused) {
            uiManager.showPauseMenu();
        } else {
            uiManager.hidePauseMenu();
        }
    }
});

document.getElementById('resumeBtn').addEventListener('click', () => {
    gameState.isPaused = false;
    uiManager.hidePauseMenu();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    gameState.restartGame();
    gameInstance = new Game();
    gameInstance.init(gameState.selectedCharacter);
    uiManager.hidePauseMenu();
});

document.getElementById('mainMenuBtn').addEventListener('click', () => {
    gameState.reset();
    uiManager.showScreen('mainMenu');
});

document.getElementById('exitBtn').addEventListener('click', () => {
    if (confirm('¿Deseas salir del juego?')) {
        window.close();
    }
});

// Game controls
const gameControls = {
    left: false,
    right: false,
    jump: false,
    crouch: false
};

document.addEventListener('keydown', (e) => {
    if (!gameState.gameRunning || gameState.isPaused) return;

    switch(e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
            gameControls.left = true;
            e.preventDefault();
            break;
        case 'd':
        case 'arrowright':
            gameControls.right = true;
            e.preventDefault();
            break;
        case 'w':
        case 'arrowup':
            gameControls.jump = true;
            e.preventDefault();
            break;
        case 's':
        case 'arrowdown':
            gameControls.crouch = true;
            e.preventDefault();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
            gameControls.left = false;
            break;
        case 'd':
        case 'arrowright':
            gameControls.right = false;
            break;
        case 'w':
        case 'arrowup':
            gameControls.jump = false;
            break;
        case 's':
        case 'arrowdown':
            gameControls.crouch = false;
            break;
    }
});

// Next level button
document.getElementById('nextLevelBtn').addEventListener('click', () => {
    uiManager.hideResultScreen();
    gameInstance.nextLevel();
});

// Retry button
document.getElementById('retryBtn').addEventListener('click', () => {
    uiManager.hideResultScreen();
    gameState.restartGame();
    gameInstance = new Game();
    gameInstance.init(gameState.selectedCharacter);
});

// ===== BATTLE MODE EVENTS =====

function setupBattleMode() {
    // Select first two characters for battle
    battleInstance = new BattleGame();
    const char1 = CHARACTERS[0];
    const char2 = CHARACTERS[1];
    battleInstance.init(char1, char2);
    uiManager.updateBattleHUD(char1, char2);
}

document.getElementById('backBattleBtn').addEventListener('click', () => {
    battleInstance = null;
    uiManager.showScreen('mainMenu');
});

// Battle player 1 controls
document.getElementById('p1Left').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.isMovingLeft = true;
});
document.getElementById('p1Left').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.isMovingLeft = false;
});

document.getElementById('p1Right').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.isMovingRight = true;
});
document.getElementById('p1Right').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.isMovingRight = false;
});

document.getElementById('p1Jump').addEventListener('click', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.jump();
});

document.getElementById('p1Crouch').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.crouch();
});
document.getElementById('p1Crouch').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player1) battleInstance.player1.uncrouch();
});

// Player 1 coin attacks
for (let i = 0; i < 5; i++) {
    document.getElementById(`p1Coin${i}`).addEventListener('click', () => {
        if (battleInstance) {
            const coinTypes = Object.keys(COINS_CONFIG);
            battleInstance.attackWithCoin(1, coinTypes[i]);
        }
    });
}

// Battle player 2 controls
document.getElementById('p2Left').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.isMovingLeft = true;
});
document.getElementById('p2Left').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.isMovingLeft = false;
});

document.getElementById('p2Right').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.isMovingRight = true;
});
document.getElementById('p2Right').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.isMovingRight = false;
});

document.getElementById('p2Jump').addEventListener('click', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.jump();
});

document.getElementById('p2Crouch').addEventListener('mousedown', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.crouch();
});
document.getElementById('p2Crouch').addEventListener('mouseup', () => {
    if (battleInstance && battleInstance.player2) battleInstance.player2.uncrouch();
});

// Player 2 coin attacks
for (let i = 0; i < 5; i++) {
    document.getElementById(`p2Coin${i}`).addEventListener('click', () => {
        if (battleInstance) {
            const coinTypes = Object.keys(COINS_CONFIG);
            battleInstance.attackWithCoin(2, coinTypes[i]);
        }
    });
}

// ===== SETTINGS EVENTS =====
document.getElementById('volumeSlider').addEventListener('input', (e) => {
    gameState.setVolume(e.target.value);
    document.getElementById('volumeValue').textContent = e.target.value;
});

document.getElementById('sfxToggle').addEventListener('change', () => {
    gameState.toggleSfx();
});

document.getElementById('musicToggle').addEventListener('change', () => {
    gameState.toggleMusic();
});

document.getElementById('backSettingsBtn').addEventListener('click', () => {
    uiManager.showScreen('mainMenu');
});

// ===== GAME LOOP =====

function startGameLoop() {
    function gameLoop() {
        if (gameState.gameRunning && gameInstance) {
            // Apply controls to player
            gameInstance.player.isMovingLeft = gameControls.left;
            gameInstance.player.isMovingRight = gameControls.right;

            if (gameControls.jump) {
                gameInstance.player.jump();
                gameControls.jump = false;
            }

            if (gameControls.crouch) {
                gameInstance.player.crouch();
            } else {
                gameInstance.player.uncrouch();
            }

            // Update game
            gameInstance.update();

            // Check game over
            if (gameInstance.gameOver) {
                if (gameState.lives > 0) {
                    uiManager.showResultScreen(false);
                    gameInstance.gameOver = false;
                    setTimeout(() => {
                        uiManager.hideResultScreen();
                        gameState.restartGame();
                        gameInstance = new Game();
                        gameInstance.init(gameState.selectedCharacter);
                    }, RESULT_DISPLAY_TIME);
                } else {
                    uiManager.showResultScreen(false);
                }
            }

            // Draw game
            gameInstance.draw();

            // Update HUD
            uiManager.updateHUD();
        }

        // Battle loop
        if (battleInstance) {
            battleInstance.update();
            battleInstance.draw();
            uiManager.updateBattleHUD(battleInstance.player1.character, battleInstance.player2.character);
        }

        animationId = requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

function setupEventListeners() {
    // This function can be used for any additional event setup
    console.log('Game initialized and ready to play!');
}
