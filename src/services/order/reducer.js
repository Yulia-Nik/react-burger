import {
	CREATE_ORDER,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
	CLEAR_ORDER_INFO,
} from './actions';

const initialState = {
	order: null,
	isLoading: false,
	error: null,
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ORDER:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				order: action.payload,
				isLoading: false,
			};
		case CREATE_ORDER_FAILED:
			return {
				...state,
				isLoading: false,
				order: null,
				error: action.payload,
			};
		case CLEAR_ORDER_INFO:
			return {
				...state,
				isLoading: false,
				order: null,
				error: null,
			};
		default:
			return state;
	};
};
