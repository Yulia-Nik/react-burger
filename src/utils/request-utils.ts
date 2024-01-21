import { IHttpResponse } from './types';

export const getResponse = <T>(res: IHttpResponse): Promise<T> => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};
