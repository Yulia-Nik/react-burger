import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from '../../utils/constants';
import { getResponse } from '../../utils/request-utils';
import {
	fetchWithRefresh
} from '../../utils/auth-utils';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const SET_USER = 'SET_USER';

export const setAuthChecked = value => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = user => ({
	type: SET_USER,
	payload: user,
});

export const getUser = () => {
	return async dispatch => {
		const res = await fetchWithRefresh(`${BASE_URL}auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
		});

		if (res.success) {
			dispatch({
				type: SET_USER,
				payload: res?.user,
			});
		} else {
			dispatch({
				type: SET_USER,
				payload: null,
			});
			localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
			localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
		}
	};
};

export const checkUserAuth = () => {
	return dispatch => {
		if (localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)) {
			dispatch(setAuthChecked(true));
			dispatch(getUser());
		} else {
			dispatch(setAuthChecked(true));
			dispatch(setUser(null));
		}
	};
};

export const logout = () => {
	return dispatch =>
		fetch(`${BASE_URL}auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({token: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)})
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
					localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
					dispatch(setUser(null));
				}
			});
};

export const updateUserInfo = data => {
	return dispatch =>
		fetch(`${BASE_URL}auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
			body: JSON.stringify(data)
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					dispatch(setUser(res.user));
				}
			});
};
