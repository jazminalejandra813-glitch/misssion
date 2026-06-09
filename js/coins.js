// ===== COIN SYSTEM =====

class Coin {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // GOLD, SILVER, BRONZE, CYAN, PINK
        this.config = COINS_CONFIG[type];
        this.width = 30;
        this.height = 30;
        this.vx = 0;
        this.vy = 0;
        this.collected = false;
        this.rotation = 0;
        this.scale = 1;
        this.floatDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        if (this.collected) return;

        this.vy += GAME_CONFIG.gravity * 0.5;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.1;
        
        // Float animation
        this.y += Math.sin(Date.now() / 500) * 0.5;

        // Boundary check
        if (this.y > GAME_CONFIG.height) {
            this.collected = true;
        }
    }

    draw(ctx) {
        if (this.collected) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);

        // Draw coin circle
        ctx.fillStyle = this.config.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw coin border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw emoji
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(this.config.emoji, 0, 0);

        ctx.restore();
    }

    isCollidingWith(rect) {
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y;
    }
}

class CoinManager {
    constructor() {
        this.coins = [];
        this.collection = {
            GOLD: 0,
            SILVER: 0,
            BRONZE: 0,
            CYAN: 0,
            PINK: 0
        };
    }

    spawn(x, y, type) {
        const coin = new Coin(x, y, type);
        coin.vx = (Math.random() - 0.5) * 4;
        coin.vy = -8;
        this.coins.push(coin);
    }

    update() {
        this.coins.forEach(coin => coin.update());
        this.coins = this.coins.filter(coin => !coin.collected);
    }

    draw(ctx) {
        this.coins.forEach(coin => coin.draw(ctx));
    }

    collect(type) {
        if (this.collection[type] !== undefined) {
            this.collection[type]++;
        }
    }

    getTotalValue() {
        let total = 0;
        for (let type in this.collection) {
            total += this.collection[type] * COINS_CONFIG[type].damage;
        }
        return total;
    }

    reset() {
        this.coins = [];
        this.collection = {
            GOLD: 0,
            SILVER: 0,
            BRONZE: 0,
            CYAN: 0,
            PINK: 0
        };
    }
}
