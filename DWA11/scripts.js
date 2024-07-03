import store from './store.js';

// Initial state
console.log('Initial state:', store.getState());

// DOM elements
const domElements = {
    number : document.querySelector('[data-key="number"]'),
    subtract : document.querySelector('[data-key="subtract"]'),
    add : document.querySelector('[data-key="add"]'),
    reset : {
        reset : document.querySelector('[data-key="reset"]'),
        resetOverlay : document.querySelector('[data-key="reset-button"]')
    }
}

const render = () => {
    const state = store.getState();
    domElements.number.value = state.count;
    domElements.add.disabled = state.count >= 10;
    domElements.subtract.disabled = state.count <= -10;
};

store.subscribe(render);

const subtractHandler = () =>{
    store.dispatch({ type: 'SUBTRACT' });
}

const addHandler = () =>{
    store.dispatch({ type: 'ADD' });
}

const resetHandler = () => {    
    store.dispatch({ type: 'RESET' });
    domElements.reset.resetOverlay.show();
}

domElements.add.addEventListener('click', addHandler);
domElements.subtract.addEventListener('click', subtractHandler);
domElements.reset.reset.addEventListener('click', resetHandler);

// Scenario: Increment the counter by one
console.log('Scenario 1: Increment the counter by one');
console.log('Initial state:', store.getState()); // Should be { count: 0 }

// Dispatch ADD action twice
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' });

// State should now be 2
console.log('Scenario 2: State after two ADD actions:', store.getState()); // Should be { count: 2 }

// Dispatch SUBTRACT action
store.dispatch({ type: 'SUBTRACT' });

// State should now be 1
console.log('Scenario 3: State after one SUBTRACT action:', store.getState()); // Should be { count: 1 }

// Dispatch RESET action
store.dispatch({ type: 'RESET' });

// State should now be 0
console.log('Scenario 4: State after RESET action:', store.getState()); // Should be { count: 0 }