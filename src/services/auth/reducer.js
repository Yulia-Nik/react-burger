import {
	GET_USER,
	SET_USER,
	SET_AUTH_CHECKED,
	DELETE_USER,
} from './actions';

const initialState = {
	user: null,
	isAuthChecked: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};
		case GET_USER:
			return state.user;
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case DELETE_USER:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};
