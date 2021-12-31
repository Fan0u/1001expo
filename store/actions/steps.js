export const ADD_STEP = 'ADD_STEP';

export const addStep = (num) => {
	return {
		type: ADD_STEP,
		num: num,
	}
}

