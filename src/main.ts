import Experience from './Experience/Experience';

const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl');
if (!canvas) throw new Error('Canvas element not found');

// Create singleton, assign to window only
new Experience(canvas);
