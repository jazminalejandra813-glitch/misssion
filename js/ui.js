// ===== UI MANAGEMENT =====

class UIManager {
    constructor() {
        this.screens = {
            mainMenu: document.getElementById('mainMenu'),
            characterSelection: document.getElementById('characterSelection'),
            gameScreen: document.getElementById('gameScreen'),
            battleScreen: document.getElementById('battleScreen'),
            settingsScreen: document.getElementById('settingsScreen')
        };
    }

    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }

    updateHUD() {
        // Update character name
        if (gameState.selectedCharacter) {
            document.getElementById('characterName').textContent = gameState.selectedCharacter.name;
        }

        // Update level display
        document.getElementById('levelDisplay').textContent = gameState.currentLevel;

        // Update lives display
        this.updateLivesDisplay();

        // Update score display
        document.getElementById('scoreDisplay').textContent = gameState.score;

        // Update coins display
        if (gameInstance && gameInstance.coinManager) {
            const coins = gameInstance.coinManager.collection;
            const coinsHtml = Object.entries(coins)
                .map(([type, count]) => {
                    if (count > 0) {
                        return `<span title="${COINS_CONFIG[type].name}">${COINS_CONFIG[type].emoji} ${count}</span>`;
                    }
                    return '';
                })
                .join(' ');
            document.getElementById('coinsDisplay').innerHTML = coinsHtml || 'Sin monedas';
        }
    }

    updateLivesDisplay() {
        const livesContainer = document.getElementById('livesDisplay');
        livesContainer.innerHTML = '';

        for (let i = 0; i < gameState.lives; i++) {
            const lifeElement = document.createElement('div');
            lifeElement.className = 'life';
            lifeElement.textContent = i + 1;
            livesContainer.appendChild(lifeElement);
        }
    }

    populateCharacterSelection() {
        const grid = document.getElementById('characterGrid');
        grid.innerHTML = '';

        CHARACTERS.forEach(char => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.id = `char-${char.id}`;
            card.innerHTML = `
                <div class="character-portrait">${char.emoji}</div>
                <div class="character-name">${char.name}</div>
                <div class="character-advantages">${char.advantages.split('\n').join('<br>')}</div>
            `;

            card.addEventListener('click', () => this.selectCharacter(char.id));
            grid.appendChild(card);
        });
    }

    selectCharacter(charId) {
        // Update UI selection
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.getElementById(`char-${charId}`).classList.add('selected');

        // Update game state
        gameState.selectCharacter(charId);
    }

    showPauseMenu() {
        document.getElementById('gameMenu').classList.remove('hidden');
    }

    hidePauseMenu() {
        document.getElementById('gameMenu').classList.add('hidden');
    }

    showResultScreen(isVictory) {
        const resultScreen = document.getElementById('resultScreen');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');

        if (isVictory) {
            resultTitle.textContent = '¡VICTORIA!';
            resultTitle.className = 'victory';
            resultMessage.textContent = `¡Ganaste el nivel ${gameState.currentLevel}!`;
        } else {
            resultTitle.textContent = 'DERROTA';
            resultTitle.className = 'defeat';
            resultMessage.textContent = `Perdiste una vida. Vidas restantes: ${gameState.lives}`;
        }

        resultScreen.classList.remove('hidden');
    }

    hideResultScreen() {
        document.getElementById('resultScreen').classList.add('hidden');
    }

    updateBattleHUD(player1, player2) {
        document.getElementById('battlePlayer1Name').textContent = player1.name;
        document.getElementById('battlePlayer2Name').textContent = player2.name;

        // Update health bars
        const health1Percent = (player1.health / 100) * 100;
        const health2Percent = (player2.health / 100) * 100;

        document.getElementById('healthBar1').innerHTML = `<div class="health-bar-fill" style="width: ${health1Percent}%"></div>`;
        document.getElementById('healthBar2').innerHTML = `<div class="health-bar-fill" style="width: ${health2Percent}%"></div>`;
    }

    updateSettingsUI() {
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.getElementById('volumeValue');
        const sfxToggle = document.getElementById('sfxToggle');
        const musicToggle = document.getElementById('musicToggle');

        volumeSlider.value = gameState.settings.volume;
        volumeValue.textContent = gameState.settings.volume;
        sfxToggle.checked = gameState.settings.sfxEnabled;
        musicToggle.checked = gameState.settings.musicEnabled;
    }
}

// Global UI manager instance
const uiManager = new UIManager();
