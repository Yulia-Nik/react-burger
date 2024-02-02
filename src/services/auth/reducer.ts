import { IUserData } from '../../utils/types';
import {
	SET_USER,
	SET_AUTH_CHECKED,
	TAuthActions,
} from './actions';

interface IAuthStore {
	user: null | IUserData;
	isAuthChecked: boolean;
}

const initialState: IAuthStore = {
	user: null,
	isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthActions): IAuthStore => {
	switch (action.type) {
		case SET_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
