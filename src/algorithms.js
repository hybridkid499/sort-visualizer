
export function bubbleSort(input) {
  const arr = [...input]; 
  const steps = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'swap', indices: [j, j + 1] });
      }
    }
    
    steps.push({ type: 'sorted', indices: [n - 1 - i] });
  }
  steps.push({ type: 'sorted', indices: [0] }); 

  return steps;
}


export function insertionSort(input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({ type: 'sorted', indices: [0] }); 

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      steps.push({ type: 'compare', indices: [j - 1, j] });
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        steps.push({ type: 'swap', indices: [j - 1, j] });
        j--;
      } else {
        break; 
      }
    }
  }
  
  for (let k = 0; k < n; k++) {
    steps.push({ type: 'sorted', indices: [k] });
  }

  return steps;
}


export function quickSort(input) {
  const arr = [...input];
  const steps = [];

  
  quickSortHelper(arr, 0, arr.length - 1, steps);

  return steps;
}

function quickSortHelper(arr, low, high, steps) {
  if (low > high) return;

  
  if (low === high) {
    steps.push({ type: 'sorted', indices: [low] });
    return;
  }

  const pivotIndex = partition(arr, low, high, steps);

  
  steps.push({ type: 'sorted', indices: [pivotIndex] });

  quickSortHelper(arr, low, pivotIndex - 1, steps);
  quickSortHelper(arr, pivotIndex + 1, high, steps);
}

function partition(arr, low, high, steps) {
  const pivot = arr[high]; 
  let i = low; 

  for (let j = low; j < high; j++) {
    steps.push({ type: 'compare', indices: [j, high] }); 
    if (arr[j] < pivot) {
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ type: 'swap', indices: [i, j] });
      }
      i++;
    }
  }

  
  if (i !== high) {
    [arr[i], arr[high]] = [arr[high], arr[i]];
    steps.push({ type: 'swap', indices: [i, high] });
  }

  return i; 
}


export function mergeSort(input) {
  const arr = [...input];
  const steps = [];

  mergeSortHelper(arr, 0, arr.length - 1, steps);

  
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: 'sorted', indices: [i] });
  }

  return steps;
}

function mergeSortHelper(arr, left, right, steps) {
  if (left >= right) return; 

  const mid = Math.floor((left + right) / 2);

  mergeSortHelper(arr, left, mid, steps);       
  mergeSortHelper(arr, mid + 1, right, steps);  
  merge(arr, left, mid, right, steps);          
}

function merge(arr, left, mid, right, steps) {
  
  const leftHalf = arr.slice(left, mid + 1);
  const rightHalf = arr.slice(mid + 1, right + 1);

  let i = 0;        
  let j = 0;        
  let k = left;     

  while (i < leftHalf.length && j < rightHalf.length) {
    
    steps.push({ type: 'compare', indices: [left + i, mid + 1 + j] });

    if (leftHalf[i] <= rightHalf[j]) {
      arr[k] = leftHalf[i];
      steps.push({ type: 'overwrite', index: k, value: leftHalf[i] });
      i++;
    } else {
      arr[k] = rightHalf[j];
      steps.push({ type: 'overwrite', index: k, value: rightHalf[j] });
      j++;
    }
    k++;
  }

  
  while (i < leftHalf.length) {
    arr[k] = leftHalf[i];
    steps.push({ type: 'overwrite', index: k, value: leftHalf[i] });
    i++;
    k++;
  }

  
  while (j < rightHalf.length) {
    arr[k] = rightHalf[j];
    steps.push({ type: 'overwrite', index: k, value: rightHalf[j] });
    j++;
    k++;
  }
}