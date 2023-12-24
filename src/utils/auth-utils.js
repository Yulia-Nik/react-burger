import { BASE_URL, ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './constants';
import { getResponse } from './request-utils';
import { setUser, setAuthChecked } from '../services/auth/actions';

export const checkUserAuth = user =>
	dispatch => {
		if (!user && localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)) {
			localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
			localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
			dispatch(setUser(null));
		}
		dispatch(setAuthChecked(true));
	};
