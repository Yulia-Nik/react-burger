import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY
} from './constants';
import { getResponse } from './request-utils';
import { IRefreshToken } from './types';

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
	}).then(res => getResponse<IRefreshToken>(res));

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await getResponse(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData: any = await refreshToken();

			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}

			localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshData.refreshToken);
			localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshData.accessToken.split('Bearer ')[1]);

			options.headers = {
				...options.headers,
				'Authorization': refreshData.accessToken,
			};
			const res = await fetch(url, options);
			return await getResponse(res);
		} else {
			new Error(`Произошла ошибка: ${err}`);
			return Promise.reject(err);
		}
	}
};
