import { ADD_STEP } from "../actions/steps";

const initialState = {
	step: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_STEP:
			const addStep = state.step + 1 ;
			console.log("monstep", state.step)
			return {
				...state,
				step: addStep,
			};
		default:
			return state;
	}
};


