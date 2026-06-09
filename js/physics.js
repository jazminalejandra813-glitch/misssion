// ===== PLAYER CHARACTER =====

class Player {
    constructor(character) {
        this.character = character;
        this.x = GAME_CONFIG.width / 2;
        this.y = GAME_CONFIG.groundLevel;
        this.width = 40;
        this.height = 60;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
        this.isCrouching = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.health = 100;
        this.maxHealth = 100;
        this.damageBlinkTime = 0;
        this.isDamageBlinking = false;
    }

    update() {
        // Horizontal movement
        if (this.isMovingLeft) this.vx = -5;
        else if (this.isMovingRight) this.vx = 5;
        else this.vx = 0;

        // Gravity
        this.vy += GAME_CONFIG.gravity;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Ground collision
        if (this.y >= GAME_CONFIG.groundLevel) {
            this.y = GAME_CONFIG.groundLevel;
            this.vy = 0;
            this.isJumping = false;
        }

        // Boundary check
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > GAME_CONFIG.width) this.x = GAME_CONFIG.width - this.width;

        // Damage blink
        if (this.isDamageBlinking) {
            this.damageBlinkTime--;
            if (this.damageBlinkTime <= 0) {
                this.isDamageBlinking = false;
            }
        }
    }

    jump() {
        if (!this.isJumping && this.y >= GAME_CONFIG.groundLevel) {
            this.vy = -12;
            this.isJumping = true;
        }
    }

    crouch() {
        this.isCrouching = true;
        this.height = 40;
    }

    uncrouch() {
        this.isCrouching = false;
        this.height = 60;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.isDamageBlinking = true;
        this.damageBlinkTime = DAMAGE_BLINK_DURATION;
    }

    draw(ctx) {
        // Only draw if not blinking, or blink every 50ms
        if (this.isDamageBlinking && Math.floor(this.damageBlinkTime / 50) % 2 === 0) {
            return;
        }

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);

        // Damage red tint
        if (this.isDamageBlinking) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.fillRect(-this.width / 2, 0, this.width, this.height);
        }

        // Draw character
        ctx.fillStyle = this.character.color;
        ctx.fillRect(-this.width / 2, 0, this.width, this.height);

        // Draw emoji
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.character.emoji, 0, this.height / 2);

        // Draw character name above
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.character.name, 0, -10);

        ctx.restore();
    }

    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

// ===== OBSTACLES =====

class Obstacle {
    constructor(type, speed) {
        this.type = type;
        this.speed = speed;
        this.x = GAME_CONFIG.width;
        this.y = GAME_CONFIG.groundLevel;
        this.width = 40;
        this.height = 40;
        this.passed = false;
        this.rotation = 0;
    }

    update() {
        this.x -= this.speed;
        this.rotation += 0.05;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);
        ctx.rotate(this.rotation);

        switch (this.type) {
            case 'spike':
                ctx.fillStyle = '#ff4444';
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, this.height / 2);
                ctx.lineTo(this.width / 2, this.height / 2);
                ctx.closePath();
                ctx.fill();
                break;

            case 'box':
                ctx.fillStyle = '#ffaa00';
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                ctx.strokeStyle = '#ff8800';
                ctx.lineWidth = 2;
                ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
                break;

            case 'ball':
                ctx.fillStyle = '#00ff00';
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'saw':
                ctx.fillStyle = '#666666';
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    const angle = (i / 8) * Math.PI * 2;
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * this.width / 2, Math.sin(angle) * this.height / 2);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 3, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'laser':
                ctx.fillStyle = '#ff00ff';
                ctx.fillRect(-this.width / 2, -this.height / 4, this.width, this.height / 2);
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(-this.width / 2, -this.height / 8, this.width, this.height / 4);
                break;
        }

        ctx.restore();
    }

    isCollidingWith(player) {
        const pb = player.getBoundingBox();
        return this.x < pb.x + pb.width &&
               this.x + this.width > pb.x &&
               this.y < pb.y + pb.height &&
               this.y + this.height > pb.y;
    }

    isOffScreen() {
        return this.x < -this.width;
    }
}
