
export const BarState = {
  NORMAL: 'normal',
  COMPARING: 'comparing',
  SWAPPING: 'swapping',
  SORTED: 'sorted',
};


export class SortPlayer {
  constructor(initialArray, steps) {
    this.initial = [...initialArray]; 
    this.steps = steps;
    this.reset();
  }

  reset() {
    this.values = [...this.initial];
    this.states = this.initial.map(() => BarState.NORMAL);
    this.cursor = 0; 
  }

  isDone() {
    return this.cursor >= this.steps.length;
  }

  
  next() {
    if (this.isDone()) return false;

    
    this.states = this.states.map((s) =>
      s === BarState.SORTED ? s : BarState.NORMAL
    );

    const step = this.steps[this.cursor];
    this.applyStep(step);
    this.cursor++;
    return true;
  }

  applyStep(step) {
    switch (step.type) {
      case 'compare': {
        const [i, j] = step.indices;
        this.states[i] = BarState.COMPARING;
        this.states[j] = BarState.COMPARING;
        break;
      }
      case 'swap': {
        const [i, j] = step.indices;
        [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
        this.states[i] = BarState.SWAPPING;
        this.states[j] = BarState.SWAPPING;
        break;
      }
      case 'overwrite': {
        
        const { index, value } = step;
        this.values[index] = value;
        this.states[index] = BarState.SWAPPING;
        break;
      }
      case 'sorted': {
        for (const i of step.indices) {
          this.states[i] = BarState.SORTED;
        }
        break;
      }
    }
  }

  
  getState() {
    return { values: this.values, states: this.states };
  }
}