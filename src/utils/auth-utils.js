import { BASE_URL, ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './constants';
import { getResponse } from './request-utils';
import { setUser, setAuthChecked } from '../services/auth/actions';

export const checkUserAuth1 = user =>
	dispatch => {
		if (!user && localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)) {
			localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
			localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
			dispatch(setUser(null));
		}
		dispatch(setAuthChecked(true));
	};

const getUser = () => {
	return dispatch =>
		fetch(`${BASE_URL}auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					dispatch(setUser(res.user));
				}
			})
			.catch(() => {
				localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
				localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
				dispatch(setUser(null));
			})
			.finally(() => dispatch(setAuthChecked(true)));
};

const checkReponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const checkUserAuth = () => {
	return dispatch => {
		if (localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)) {
			dispatch(getUser());
		} else {
			dispatch(setAuthChecked(true));
			dispatch(setUser(null));
		}
	};
};

export const refreshToken = () =>
	fetch(`${BASE_URL}auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
		},
		body: JSON.stringify({
			token: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
		}),
	}).then(getResponse);

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен

			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}

			localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshData.refreshToken);
			localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshData.accessToken);

			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
