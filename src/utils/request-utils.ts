export const getResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};
