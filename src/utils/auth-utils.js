import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY
} from './constants';
import { getResponse } from './request-utils';

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
		return await getResponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();

			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}

			localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshData.refreshToken);
			localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshData.accessToken.split('Bearer ')[1]);

			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await getResponse(res);
		} else {
			new Error(`Произошла ошибка: ${err}`);
			return err;
		}
	}
};
