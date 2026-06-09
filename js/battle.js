// ===== BATTLE MODE =====

class BattleGame {
    constructor() {
        this.canvas1 = document.getElementById('battleCanvas1');
        this.ctx1 = this.canvas1.getContext('2d');
        this.canvas2 = document.getElementById('battleCanvas2');
        this.ctx2 = this.canvas2.getContext('2d');
        
        this.player1 = null;
        this.player2 = null;
        this.particleSystem = new ParticleSystem();
        this.gameOver = false;
        this.winner = null;
        this.resultDisplayTime = 0;
    }

    init(character1, character2) {
        this.player1 = new Player(character1);
        this.player1.x = 100;
        this.player1.maxHealth = 100;
        this.player1.health = 100;

        this.player2 = new Player(character2);
        this.player2.x = this.canvas2.width - 140;
        this.player2.maxHealth = 100;
        this.player2.health = 100;

        this.gameOver = false;
        this.winner = null;
        this.resultDisplayTime = 0;
        this.particleSystem.clear();
    }

    update() {
        if (this.gameOver) {
            this.resultDisplayTime++;
            return;
        }

        this.player1.update();
        this.player2.update();
        this.particleSystem.update();

        // Check if game over
        if (this.player1.health <= 0) {
            this.gameOver = true;
            this.winner = this.player2;
            this.createVictoryParticles(this.player2.x, this.player2.y, '#ffd700', VICTORY_PARTICLE_COUNT);
            this.createDefeatParticles(this.player1.x, this.player1.y, '#ff4444', DEFEAT_PARTICLE_COUNT);
        } else if (this.player2.health <= 0) {
            this.gameOver = true;
            this.winner = this.player1;
            this.createVictoryParticles(this.player1.x, this.player1.y, '#ffd700', VICTORY_PARTICLE_COUNT);
            this.createDefeatParticles(this.player2.x, this.player2.y, '#ff4444', DEFEAT_PARTICLE_COUNT);
        }
    }

    attackWithCoin(playerNum, coinType) {
        const damage = COINS_CONFIG[coinType].damage;
        if (playerNum === 1) {
            this.player2.takeDamage(damage);
            this.particleSystem.emit(this.player2.x, this.player2.y, 15, COINS_CONFIG[coinType].color, 3);
        } else {
            this.player1.takeDamage(damage);
            this.particleSystem.emit(this.player1.x, this.player1.y, 15, COINS_CONFIG[coinType].color, 3);
        }
    }

    createVictoryParticles(x, y, color, count) {
        this.particleSystem.emit(x, y, count, color, 5);
    }

    createDefeatParticles(x, y, color, count) {
        this.particleSystem.emit(x, y, count, color, 3);
    }

    draw() {
        // Draw player 1
        this.ctx1.fillStyle = '#222';
        this.ctx1.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.player1.draw(this.ctx1);

        // Draw health bar 1
        this.drawHealthBar(this.ctx1, this.player1);

        // Draw player 2
        this.ctx2.fillStyle = '#222';
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
        
        // Flip context for right-side player
        this.ctx2.save();
        this.ctx2.translate(this.canvas2.width, 0);
        this.ctx2.scale(-1, 1);
        this.player2.x = this.canvas2.width - this.player2.x - this.player2.width;
        this.player2.draw(this.ctx2);
        this.player2.x = this.canvas2.width - this.player2.x - this.player2.width;
        this.ctx2.restore();

        // Draw health bar 2
        this.drawHealthBar(this.ctx2, this.player2);

        // Draw particles
        this.particleSystem.draw(this.ctx1);
        this.particleSystem.draw(this.ctx2);
    }

    drawHealthBar(ctx, player) {
        const barWidth = 200;
        const barHeight = 20;
        const x = 10;
        const y = 10;

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Health fill
        const healthPercent = player.health / player.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
        ctx.fillRect(x, y, barWidth * healthPercent, barHeight);

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Health text
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.ceil(player.health)} / ${player.maxHealth}`, x + barWidth / 2, y + 14);
    }

    getResultScreen() {
        if (!this.gameOver) return null;

        if (this.winner === this.player1) {
            return {
                title: '¡VICTORIA!',
                titleClass: 'victory',
                character: this.player1.character,
                displayTime: this.resultDisplayTime
            };
        } else {
            return {
                title: 'DERROTA',
                titleClass: 'defeat',
                character: this.player2.character,
                displayTime: this.resultDisplayTime
            };
        }
    }
}

// Global battle instance
let battleInstance = null;
