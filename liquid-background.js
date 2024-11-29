class LiquidBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.lastX = 0;
        this.lastY = 0;
        this.points = [];
        this.maxPoints = 175; 
        this.interactionRadius = 150;
        this.connectionDistance = 150;
        // Enhanced color palette with vibrant colors
        this.colors = [
            '#4FACFE',  // Blue
            '#B465DA',  // Purple
            '#6F86D6',  // Light Blue
            '#A1C4FD',  // Soft Blue
            '#FFFFFF',  // White
            '#FF61D8',  // Pink
            '#7CB9E8'   // Light Blue
        ];
        
        this.init();
    }

    init() {
        this.canvas.id = 'liquid-background';
        document.body.appendChild(this.canvas);
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        
        for(let i = 0; i < this.maxPoints; i++) {
            this.points.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                size: Math.random() * 3 + 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }

        this.addEventListeners();
        this.animate();
    }

    addEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });

        // Handle mouse movement
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate mouse velocity
            const dx = mouseX - this.lastX;
            const dy = mouseY - this.lastY;
            const mouseSpeed = Math.sqrt(dx * dx + dy * dy);
            
            // Affect nearby points
            this.points.forEach(point => {
                const dx = mouseX - point.x;
                const dy = mouseY - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < this.interactionRadius) {
                    const force = (1 - dist / this.interactionRadius) * mouseSpeed * 0.05;
                    point.vx -= (dx / dist) * force;
                    point.vy -= (dy / dist) * force;
                }
            });
            
            this.lastX = mouseX;
            this.lastY = mouseY;
        });
    }

    animate() {
        // Create semi-transparent fade effect
        this.ctx.fillStyle = 'rgba(15, 22, 36, 0.1)'; // Using your background color
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.points.forEach(point => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Add some random movement
            point.vx += (Math.random() - 0.5) * 0.2;
            point.vy += (Math.random() - 0.5) * 0.2;
            
            // Apply friction
            point.vx *= 0.98;
            point.vy *= 0.98;
            
            // Bounce off edges
            if(point.x < 0) {
                point.x = 0;
                point.vx *= -1;
            }
            if(point.x > this.width) {
                point.x = this.width;
                point.vx *= -1;
            }
            if(point.y < 0) {
                point.y = 0;
                point.vy *= -1;
            }
            if(point.y > this.height) {
                point.y = this.height;
                point.vy *= -1;
            }
            
            // Draw point
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            this.ctx.fillStyle = point.color;
            this.ctx.fill();
            
            // Draw connections
            this.points.forEach(otherPoint => {
                const dx = otherPoint.x - point.x;
                const dy = otherPoint.y - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(point.x, point.y);
                    this.ctx.lineTo(otherPoint.x, otherPoint.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist/100)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
new LiquidBackground(); 