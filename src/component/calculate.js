function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const getNewState = (data, state) => {
  // Initializing New Object
  let newState = { variable: state };

  // Take the Keys of the NFA Object 
  // For Example:{ id:1, variable: "q1" , a:"q1,q2", b:"q3,q4" }
  // Result: [id,variable,a,b]
  let variables = Object.keys(data[0]);
  

  // Drop id & variable from the Array before
  variables = variables.filter((text) => text != "id" && text != "variable");

  // Maps on the variable
  variables.map((inpt) => {
    // Creates DFA Array
    let FINAL_DFA = Array();
    // Map on the given states
    // For Example if state = "q1,q2" it maps on q1 and q2 to get the reachable state from a specific input
    state.split(",").map((lst) => {
      // Return the Reachable states from the NFA Transition Table
      let DFA_VALUE = data.filter((element) => {
        return element.variable == lst;
      })[0][inpt.toString()];
      // Checks if their is a Reachable States
      if (DFA_VALUE && !FINAL_DFA.includes(DFA_VALUE)) {
      // Add the Reachable States
        FINAL_DFA.push(DFA_VALUE);
      }
    });
    // Sort and Remove Duplicates from the Array
    let tempState = [...new Set(FINAL_DFA.join(",").split(","))]
      .sort()
      .join(",");
    newState[inpt] = tempState;
  });
  return newState;
};

const checkState = (data, state) => {
  // checks if a state is existed in the NFA
  const answer = data.filter((element) => {
    return element.variable == state;
  });
  // check if the Length of the Array is 0
  if (answer.length != 0) return true;
  return false;
};

const addDeadState = (data) => {
  // Initialize the Dead State
  let variables = Object.keys(data[0]);

  // Intitialize the Count of Data
  let countOfDead = 0;

  // Drop id & variable from the Array before
  variables = variables.filter((text) => text != "id" && text != "variable");

  // Map on the data and check if their is no reachable state so we add DEADSTATE 
  data.map((element) => {
    variables.map((inpt) => {
      if (!element[inpt]) {
        element[inpt] = `DEADSTATE`;
        countOfDead++;
      }
    });
  });

  // Check if the Count of the DEADSTATES are greater than 0 to create the DEADSTATE
  if (countOfDead > 0) {
    let deadState = { variable: `DEADSTATE` };
    variables.map((inpt) => {
      deadState[inpt] = `DEADSTATE`;
    });
    data.push(deadState);
  }

  return data;
};

const FINALIZE_NFA = (data, INITIAL_STATE, FINAL_STATE) => {
  // loop on the transition
  data.map((element) => {
    if (
      element.variable
        .split(",")
        .some((r) => FINAL_STATE.split(",").includes(r)) &&
      element.variable === INITIAL_STATE
    ) {
      // checks if a given state is initial and final
      element["init"] = true;
      element["final"] = true;
    } else if (element.variable === INITIAL_STATE) {
      // checks if a given state is initial
      element["init"] = true;
      element["final"] = false;
    } else if (
      element.variable
        .split(",")
        .some((r) => FINAL_STATE.split(",").includes(r))
    ) {
      // checks if a given state is final
      element["init"] = false;
      element["final"] = true;
    } else {
      // checks if a given state is neither initial nor final
      element["init"] = false;
      element["final"] = false;
    }
  });
  return data;
};

export const NFA_DFA = (data, INITIAL_STATE, FINAL_STATE) => {
  // Intitialize the DFA Transition Table
  let newScheme = Array();

  // Pushes the Initial State to the Transition Table
  newScheme.push(getNewState(data, INITIAL_STATE));

  // Pushes all Reachable States to an Arrray and Remove the Null Element
  let newState = Object.values(...newScheme);
  newState = newState.filter((v) => v != "");

  // Pushes all the Named States to another Array
  let newSchemeStates = Array();
  newScheme.map((e) => {
    newSchemeStates.push(e.variable);
  });


  // Sort Both Arrays
  newSchemeStates = newSchemeStates.sort();
  newState = newState.sort();

  // Repeat the before Instruction untill the both arrays are equal
  while (!arrayEquals(newSchemeStates, newState)) {
    newSchemeStates = Array();
    newScheme.map((e) => {
      newSchemeStates.push(e.variable);
    });
    newState.map((element) => {
      // checks if the state existed in the Transition Table  
      if (!checkState(newScheme, element)) {
        // Pushes the state to the new transition table
        newScheme.push(getNewState(data, element));
      }
      newState.push(...Object.values(getNewState(data, element)));
      newState = [...new Set(newState.filter((v) => v != ""))];
    });
    newSchemeStates = newSchemeStates.sort();
    newState = newState.sort();
  }


  return FINALIZE_NFA(addDeadState(newScheme), INITIAL_STATE, FINAL_STATE);
}



export const checkString = (string, DFA, INITIAL_STATE) => {
  // Initialize the current state to INITIAL_STATE 
  let currentState = INITIAL_STATE;

  // loop on the string given character by character
  let current = string.split("").map((digit) => {
    // take the variable of the reachable state
    let data = DFA.filter((e) => e.variable == currentState);
    const currentObject = new Object(...data);
    // changes the current state to where a character reached
    currentState = currentObject[digit];
    // save the current state to array called current
    return currentState.replaceAll(",", "");
  });
  return current;
};

export const checkFinalState = (state, DFA) => {
  if (state){
    let currentState = new Object(...DFA.filter(e => e.variable.replaceAll(",","") == state[state.length - 1]))
    return currentState.final
  }
  // return FINAL_STATES.map((fState) => {
  //   console.log(fState)
  // });
};

