// ===== MAIN GAME CLASS =====

class Game {
    constructor() {
        this.renderer = new Renderer('gameCanvas');
        this.player = null;
        this.obstacles = [];
        this.coinManager = new CoinManager();
        this.particleSystem = new ParticleSystem();
        this.lastObstacleTime = 0;
        this.scrollX = 0;
        this.gameOver = false;
    }

    init(character) {
        this.player = new Player(character);
        this.obstacles = [];
        this.coinManager.reset();
        this.particleSystem.clear();
        this.lastObstacleTime = 0;
        this.scrollX = 0;
        this.gameOver = false;
    }

    update() {
        if (gameState.isPaused || this.gameOver) return;

        // Update player
        this.player.update();

        // Update obstacles
        this.obstacles.forEach(obstacle => obstacle.update());

        // Spawn obstacles
        const currentLevel = LEVELS[gameState.currentLevel - 1];
        if (Date.now() - this.lastObstacleTime > currentLevel.obstacleSpawn) {
            this.spawnObstacle(currentLevel);
            this.lastObstacleTime = Date.now();
        }

        // Check collisions with obstacles
        this.obstacles.forEach(obstacle => {
            if (obstacle.isCollidingWith(this.player)) {
                this.player.takeDamage(20);
                if (this.player.health <= 0) {
                    gameState.loseLive();
                    this.gameOver = true;
                }
            }
        });

        // Check coin collection
        this.coinManager.coins.forEach(coin => {
            if (coin.isCollidingWith(this.player.getBoundingBox())) {
                this.coinManager.collect(coin.type);
                gameState.addScore(COINS_CONFIG[coin.type].damage * 10);
                coin.collected = true;
                this.particleSystem.emit(coin.x, coin.y, 10, COINS_CONFIG[coin.type].color, 2);
            }
        });

        // Update managers
        this.coinManager.update();
        this.particleSystem.update();

        // Remove off-screen obstacles
        this.obstacles = this.obstacles.filter(obs => !obs.isOffScreen());

        // Scroll background
        this.scrollX += LEVELS[gameState.currentLevel - 1].speed * 0.5;
    }

    spawnObstacle(level) {
        const type = level.obstacleTypes[Math.floor(Math.random() * level.obstacleTypes.length)];
        const obstacle = new Obstacle(type, level.speed);
        
        // Random height variations
        const heightVariation = Math.random() * 3;
        if (heightVariation < 1) {
            obstacle.y = GAME_CONFIG.groundLevel - 40;
        } else if (heightVariation < 2) {
            obstacle.y = GAME_CONFIG.groundLevel - 80;
        }

        this.obstacles.push(obstacle);

        // Spawn coins randomly
        if (Math.random() < 0.3) {
            const coinTypes = Object.keys(COINS_CONFIG);
            const coinType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
            this.coinManager.spawn(obstacle.x, obstacle.y - 80, coinType);
        }
    }

    draw() {
        this.renderer.clear('#000');
        this.renderer.drawBackground(this.player.character, this.scrollX);

        // Draw obstacles
        this.obstacles.forEach(obstacle => obstacle.draw(this.renderer.ctx));

        // Draw coins
        this.coinManager.draw(this.renderer.ctx);

        // Draw player
        this.player.draw(this.renderer.ctx);

        // Draw particles
        this.particleSystem.draw(this.renderer.ctx);
    }

    nextLevel() {
        gameState.nextLevel();
        this.init(this.player.character);
    }
}

// Global game instance
let gameInstance = null;
