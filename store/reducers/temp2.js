const initialState = {
	temp: [
		{
			name: 'Rochebelle'
		},
		{
			name: 'Autre'
		}
	]
}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
}