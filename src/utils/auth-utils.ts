import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY
} from './constants';
import { IHttpResponse } from './types';

const checkReponse = <T>(res: IHttpResponse): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
	}).then(checkReponse);

export const fetchWithRefresh = async <T>(url: string, options: T) => {
	try {
		// @ts-ignore
		const res = await fetch(url, options);
		return await checkReponse<T>(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			// TODO: Изменить
			const refreshData: any = await refreshToken();

			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}

			localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshData.refreshToken);
			localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshData.accessToken.split('Bearer ')[1]);

			// @ts-ignore
			options.headers = {
				// @ts-ignore
				...options.headers,
				'Authorization': refreshData.accessToken,
			};
			// @ts-ignore
			const res = await fetch(url, options);
			return await checkReponse(res);
		} else {
			new Error(`Произошла ошибка: ${err}`);
			return Promise.reject(err);;
		}
	}
};
