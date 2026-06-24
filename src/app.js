
import { bubbleSort, insertionSort, quickSort, mergeSort } from './algorithms.js';
import { SortPlayer } from './player.js';
import { Renderer } from './renderer.js';


const ALGORITHMS = {
  bubble:    { label: 'Bubble Sort',    fn: bubbleSort },
  insertion: { label: 'Insertion Sort', fn: insertionSort },
  quick:     { label: 'Quick Sort',     fn: quickSort },
  merge:     { label: 'Merge Sort',     fn: mergeSort },
};


const els = {
  canvas:     document.getElementById('canvas'),
  playBtn:    document.getElementById('play-btn'),
  resetBtn:   document.getElementById('reset-btn'),
  newBtn:     document.getElementById('new-btn'),
  algoSelect: document.getElementById('algo-select'),
  speedInput: document.getElementById('speed-input'),
  sizeInput:  document.getElementById('size-input'),
};

const renderer = new Renderer(els.canvas);


let player = null;
let running = false;
let lastStepTime = 0;
let currentArray = [];


let stepDelay = 40;


function makeArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}


function setup(newValues = true) {
  if (newValues) {
    currentArray = makeArray(Number(els.sizeInput.value));
  }
  const algoFn = ALGORITHMS[els.algoSelect.value].fn;
  const steps = algoFn(currentArray);
  player = new SortPlayer(currentArray, steps);
  renderer.draw(player.getState());
}


function loop(timestamp) {
  if (!running) return;

  if (timestamp - lastStepTime >= stepDelay) {
    const advanced = player.next();
    lastStepTime = timestamp;
    if (!advanced) return stop();
  }

  renderer.draw(player.getState());
  requestAnimationFrame(loop);
}


function play() {
  if (player.isDone()) setup(false); 
  running = true;
  setControlsEnabled(false);
  els.playBtn.textContent = 'pausa ⏸';
  lastStepTime = performance.now();
  requestAnimationFrame(loop);
}

function pause() {
  running = false;
  els.playBtn.textContent = 'play ▶';
  
}

function stop() {
  running = false;
  els.playBtn.textContent = 'play ▶';
  setControlsEnabled(true);
  renderer.draw(player.getState());
}

function togglePlay() {
  running ? pause() : play();
}


function setControlsEnabled(enabled) {
  els.algoSelect.disabled = !enabled;
  els.sizeInput.disabled = !enabled;
  els.newBtn.disabled = !enabled;
  
}


function reset() {
  if (!player) return;
  pause();
  player.reset();
  setControlsEnabled(true);
  renderer.draw(player.getState());
}


els.playBtn.addEventListener('click', togglePlay);
els.resetBtn.addEventListener('click', reset);

els.newBtn.addEventListener('click', () => {
  setup(true);
});

els.algoSelect.addEventListener('change', () => {
  
  
  setup(false);
});

els.sizeInput.addEventListener('input', () => {
  setup(true); 
});

els.speedInput.addEventListener('input', () => {
  
  const speed = Number(els.speedInput.value);
  stepDelay = Math.max(1, 105 - speed);
});


function populateAlgorithms() {
  for (const [key, { label }] of Object.entries(ALGORITHMS)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    els.algoSelect.append(opt);
  }
}


renderer.resize();
populateAlgorithms();
stepDelay = Math.max(1, 105 - Number(els.speedInput.value));
setup(true);

window.addEventListener('resize', () => {
  renderer.resize();
  if (player) renderer.draw(player.getState());
});