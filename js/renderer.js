// ===== RENDERER =====

class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear(color = '#000') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground(character, scrollX) {
        // Draw colored background based on character
        this.ctx.fillStyle = character.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw scrolling pattern
        const patternWidth = 100;
        const patternX = scrollX % patternWidth;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = -1; i < this.canvas.width / patternWidth + 1; i++) {
            this.ctx.fillRect(i * patternWidth + patternX, 0, 50, this.canvas.height);
        }

        // Draw ground
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, GAME_CONFIG.groundLevel, this.canvas.width, this.canvas.height - GAME_CONFIG.groundLevel);
    }

    drawParticles(particles) {
        particles.forEach(particle => particle.draw(this.ctx));
    }
}

// ===== PARTICLE SYSTEM =====

class Particle {
    constructor(x, y, vx, vy, color, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.size = 5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += GAME_CONFIG.gravity * 0.3;
        this.life--;
    }

    draw(ctx) {
        const opacity = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    isDead() {
        return this.life <= 0;
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, count, color, spread = 3) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = Math.random() * spread + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random();
            const particle = new Particle(x, y, vx, vy, color, 60 + Math.random() * 30);
            this.particles.push(particle);
        }
    }

    update() {
        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => !p.isDead());
    }

    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }

    clear() {
        this.particles = [];
    }
}
