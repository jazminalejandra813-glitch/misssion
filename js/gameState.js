// ===== GAME STATE MANAGEMENT =====

class GameState {
    constructor() {
        this.currentScreen = 'mainMenu';
        this.selectedCharacter = null;
        this.currentLevel = 1;
        this.score = 0;
        this.lives = MAX_LIVES;
        this.isPaused = false;
        this.gameOver = false;
        this.gameRunning = false;
        this.settings = {
            volume: 100,
            sfxEnabled: true,
            musicEnabled: true
        };
        this.battleMode = {
            player1: null,
            player2: null,
            active: false
        };
    }

    setScreen(screenName) {
        this.currentScreen = screenName;
    }

    selectCharacter(characterId) {
        this.selectedCharacter = getCharacterById(characterId);
    }

    startGame() {
        this.gameRunning = true;
        this.currentLevel = 1;
        this.score = 0;
        this.lives = MAX_LIVES;
        this.isPaused = false;
        this.gameOver = false;
    }

    pauseGame() {
        this.isPaused = !this.isPaused;
    }

    restartGame() {
        this.startGame();
    }

    loseLive() {
        this.lives--;
        if (this.lives <= 0) {
            this.gameOver = true;
            this.gameRunning = false;
        }
    }

    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel > LEVELS.length) {
            this.currentLevel = LEVELS.length;
        }
    }

    addScore(points) {
        this.score += points;
    }

    setVolume(value) {
        this.settings.volume = value;
    }

    toggleSfx() {
        this.settings.sfxEnabled = !this.settings.sfxEnabled;
    }

    toggleMusic() {
        this.settings.musicEnabled = !this.settings.musicEnabled;
    }

    reset() {
        this.currentScreen = 'mainMenu';
        this.selectedCharacter = null;
        this.currentLevel = 1;
        this.score = 0;
        this.lives = MAX_LIVES;
        this.isPaused = false;
        this.gameOver = false;
        this.gameRunning = false;
    }
}

// Global game state instance
const gameState = new GameState();
