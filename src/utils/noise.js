export const noise = () => {
    let canvas, ctx;
    let wWidth, wHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    // Create and append the canvas
    const createCanvas = () => {
        canvas = document.createElement("canvas");
        canvas.id = 'noise';
        canvas.className = 'noise';
        document.getElementsByTagName('main')[0].appendChild(canvas);
        ctx = canvas.getContext('2d');
    };

    // Generate noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;
        for (let i = 0; i < len; i++) {
            buffer32[i] = Math.random() < 0.5 ? 0xff000000 : 0;
        }
        noiseData.push(idata);
    };

    // Display noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }
        ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Animation loop
    const loop = () => {
        paintNoise();
        loopTimeout = setTimeout(() => {
            requestAnimationFrame(loop);
        }, 1000 / 25); // 25 FPS
    };

    // Setup canvas and noise
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        canvas.width = wWidth;
        canvas.height = wHeight;
        noiseData = []; // Reset noise data
        for (let i = 0; i < 10; i++) {
            createNoise();
        }
        loop();
    };

    // Reset and handle resize
    const reset = () => {
        window.addEventListener('resize', () => {
            clearTimeout(loopTimeout);
            setup();
        }, false);
    };

    // Initialize
    const init = () => {
        createCanvas();
        setup();
        reset();
    };

    init(); // Execute the initialization function
}