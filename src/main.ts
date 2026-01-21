import Experience from './Experience/Experience';

const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl');
if (!canvas) throw new Error('Canvas not found');

const experience = new Experience(canvas);
