var confettea = {
    options: {
        particleCount: 100, // Number of particles to create
        spread: 60, // Angle in degrees to spread from the origin
        origin: { x: 0.5, y: 0.5 }, // Origin for the confetti burst
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'], // Color options
        ticks: 300, // Duration of the burst in frames
        gravity: 0.8, // Gravity to apply to particles
        decay: 0.95, // Decay to apply to particles
        startVelocity: 30, // Starting velocity of particles
        shapes: ['square', 'circle'], // Shape options
        scalar: 1, // Scale factor for all particles
        emojis: [], // Emoji options
        images: [], // Image options
        svgs: [] // SVG options
    },
    // Function to generate a random number between a range
    randomInRange: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    // Function to create elements for the particles
    createElements: function(root, elementCount, options) {
        var elements = [];
        var shapeTypes = ['color', 'emoji', 'image', 'svg'];
        var shapeCount = shapeTypes.reduce((acc, type) => 
            acc + (type === 'color' ? options.shapes.length : options[type + 's'].length), 0);

        for (var i = 0; i < elementCount; i++) {
            var element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.top = '0';
            element.style.left = '0';
            element.style.width = element.style.height = '10px';
            element.style.pointerEvents = 'none';
            element.style.opacity = '0';

            var shapeIndex = Math.floor(Math.random() * shapeCount);
            var currentCount = 0;

            for (var j = 0; j < shapeTypes.length; j++) {
                var type = shapeTypes[j];
                var typeCount = type === 'color' ? options.shapes.length : options[type + 's'].length;
                
                if (shapeIndex < currentCount + typeCount) {
                    if (type === 'color') {
                        var colorIndex = shapeIndex - currentCount;
                        var shape = options.shapes[colorIndex];
                        var color = options.colors[Math.floor(Math.random() * options.colors.length)];
                        element.style.backgroundColor = color;
                        element.style.borderRadius = shape === 'circle' ? '50%' : '0';
                    } else if (type === 'emoji') {
                        var emojiIndex = shapeIndex - currentCount;
                        element.innerHTML = options.emojis[emojiIndex];
                        element.style.fontSize = '20px';
                        element.style.display = 'flex';
                        element.style.alignItems = 'center';
                        element.style.justifyContent = 'center';
                    } else if (type === 'image' || type === 'svg') {
                        var imgIndex = shapeIndex - currentCount;
                        var img = document.createElement('img');
                        img.src = options[type + 's'][imgIndex];
                        img.style.width = img.style.height = '100%';
                        img.style.objectFit = 'contain';
                        element.appendChild(img);
                    }
                    break;
                }
                currentCount += typeCount;
            }

            root.appendChild(element);
            elements.push(element);
        }
        return elements;
    },
    // Function to update the particle position and opacity
    updateParticle: function(particle, progress) {
        particle.physics.x += particle.physics.vx;
        particle.physics.y += particle.physics.vy;
        particle.physics.z += particle.physics.vz;
        particle.physics.vy += this.options.gravity;
        particle.physics.vx *= this.options.decay;
        particle.physics.vy *= this.options.decay;
        particle.physics.vz *= this.options.decay;
        particle.physics.wobble += 0.1;
        particle.physics.wobbleSpeed *= 0.99;
        particle.physics.wobbleHeight *= 0.99;

        particle.physics.rotation.x += particle.physics.rotationSpeed.x;
        particle.physics.rotation.y += particle.physics.rotationSpeed.y;
        particle.physics.rotation.z += particle.physics.rotationSpeed.z;

        var wobbleX = Math.sin(particle.physics.wobble) * particle.physics.wobbleHeight;
        var wobbleY = Math.cos(particle.physics.wobble) * particle.physics.wobbleHeight;

        var transform = `
            translate3d(${particle.physics.x + wobbleX}px, ${particle.physics.y + wobbleY}px, ${particle.physics.z}px)
            rotate3d(1, 0, 0, ${particle.physics.rotation.x}rad)
            rotate3d(0, 1, 0, ${particle.physics.rotation.y}rad)
            rotate3d(0, 0, 1, ${particle.physics.rotation.z}rad)
        `;
        
        particle.element.style.transform = transform;
        particle.element.style.opacity = 1 - progress;

        return particle.physics.y < window.innerHeight;
    },
    // Function to create a confetti burst
    burst: function(customOptions) {
        var opts = Object.assign({}, this.options, customOptions);
        var particles = [];
        var root = document.body;

        var rect = root.getBoundingClientRect();
        var originX = opts.origin.x * rect.width;
        var originY = opts.origin.y * rect.height;

        var elements = this.createElements(root, opts.particleCount, opts);

        for (var i = 0; i < elements.length; i++) {
            var angle = this.randomInRange(0, Math.PI * 2);
            var velocity = this.randomInRange(opts.startVelocity * 0.7, opts.startVelocity * 1.3);
            var spreadAngle = (Math.PI / 180) * this.randomInRange(-opts.spread, opts.spread);

            particles.push({
                element: elements[i],
                physics: {
                    x: originX,
                    y: originY,
                    z: 0,
                    vx: Math.cos(angle) * Math.cos(spreadAngle) * velocity,
                    vy: Math.sin(spreadAngle) * velocity,
                    vz: Math.sin(angle) * Math.cos(spreadAngle) * velocity,
                    rotation: { x: 0, y: 0, z: 0 },
                    rotationSpeed: {
                        x: this.randomInRange(-0.2, 0.2),
                        y: this.randomInRange(-0.2, 0.2),
                        z: this.randomInRange(-0.2, 0.2)
                    },
                    wobble: Math.random() * 10,
                    wobbleSpeed: this.randomInRange(0.1, 0.3),
                    wobbleHeight: this.randomInRange(2, 5)
                }
            });
        }

        var ticks = 0;
        var animate = () => {
            ticks += 1;
            var progress = ticks / opts.ticks;

            for (var i = particles.length - 1; i >= 0; i--) {
                if (!this.updateParticle(particles[i], progress)) {
                    root.removeChild(particles[i].element);
                    particles.splice(i, 1);
                }
            }

            if (particles.length > 0 && ticks < opts.ticks) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
};