# 🎉 Confettea

Confettea is a lightweight, customisable confetti effect generator for web applications. It allows you to create dynamic and fun confetti bursts with support for various types of confetti, including colored shapes, emojis, images, and SVGs.

## Features

- customisable confetti burst with adjustable parameters
- Support for multiple confetti types: colored shapes, emojis, images, and SVGs
- Realistic physics simulation with gravity, decay, and random tumbling
- Easy to integrate into any web project
- No dependencies

## Installation

To use Confettea.js in your project, simply include the script in your HTML file:

```html
<script src="path/to/confettea.js"></script>
```

You can also install confettea using npm with the following command:
```
npm install confettea
```

For more information, please see the readme over on npmjs: https://www.npmjs.com/package/confettea

## Usage

After including the script, you can create a confetti burst using the `confettea.burst()` method. Here's a basic example:

```javascript
confettea.burst({
    particleCount: 100,
    origin: { x: 0.5, y: 0.5 }
});
```

This will create a burst of 100 confetti particles from the center of the screen.

### Customization

Confettea.js offers many options for customization. Here's an example with more options:

```javascript
confettea.burst({
    particleCount: 200, 
    origin: { x: 0.5, y: 0.1 },
    spread: 80,
    startVelocity: 45,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
    shapes: ['square', 'circle'],
    emojis: ['🎉', '🎊', '🥳', '🍾'],
    images: ['path/to/image1.png', 'path/to/image2.png'],
    svgs: ['path/to/svg1.svg', 'path/to/svg2.svg'],
    ticks: 300,
    gravity: 0.8,
    decay: 0.95,
    scalar: 1
});
```

### Options

- `particleCount`: Number of confetti particles (default: 100)
- `origin`: Starting point of the burst, as a ratio of screen dimensions (default: { x: 0.5, y: 0.5 })
- `spread`: Spread angle of the burst in degrees (default: 60)
- `startVelocity`: Initial velocity of particles (default: 30)
- `colors`: Array of colors for shaped confetti (default: ['#0000ff', '#ffff00', '#ff00ff', '#00ffff'])
- `shapes`: Array of shapes for colored confetti ('square' or 'circle') (default: ['square', 'circle'])
- `emojis`: Array of emoji strings to use as confetti
- `images`: Array of image URLs to use as confetti
- `svgs`: Array of SVG URLs to use as confetti
- `ticks`: Duration of the animation in frames (default: 300)
- `gravity`: Gravity effect on particles (default: 0.8)
- `decay`: Velocity decay rate (default: 0.95)
- `scalar`: Size multiplier for particles (default: 1)

## Examples

### Celebration Burst

```javascript
confettea.burst({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#ffd700', '#ff0000', '#00ff00', '#0000ff'],
    emojis: ['🎉', '🎊', '🏆', '👏']
});
```

### Image Confetti

```javascript
confettea.burst({
    particleCount: 50,
    spread: 120,
    origin: { y: 0 },
    images: ['logo.png', 'icon.svg']
});
```

## Browser Compatibility

Confettea.js uses modern JavaScript features and should work in all modern browsers. For older browser support, you may need to use a transpiler like Babel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
