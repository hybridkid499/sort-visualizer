
import { BarState } from './player.js';


const STATE_COLORS = {
  [BarState.NORMAL]:    '#00ffc8', 
  [BarState.COMPARING]: '#ffe600', 
  [BarState.SWAPPING]:  '#ff3860', 
  [BarState.SORTED]:    '#00ff66', 
};

const BACKGROUND = '#050a0f';
const GAP = 1; 

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
    this.cssWidth = rect.width;
    this.cssHeight = rect.height;
  }

  
  draw({ values, states }) {
    const ctx = this.ctx;
    const w = this.cssWidth;
    const h = this.cssHeight;

    
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, w, h);

    if (values.length === 0) return;

    
    const n = values.length;
    const barWidth = (w - GAP * (n - 1)) / n;
    const maxValue = Math.max(...values);

    
    for (let i = 0; i < n; i++) {
      const barHeight = (values[i] / maxValue) * h;
      const x = i * (barWidth + GAP);
      const y = h - barHeight; 

      ctx.fillStyle = STATE_COLORS[states[i]] ?? STATE_COLORS[BarState.NORMAL];
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }
}