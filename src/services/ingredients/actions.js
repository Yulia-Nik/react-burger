import { getResponse } from '../../utils/request-utils';
import { BASE_URL } from '../../utils/constants';

export const GET_INGREDIENTS_LIST = 'GET_INGREDIENTS_LIST';

export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENTS_LIST_SUCCESS';

export const GET_INGREDIENTS_LIST_FAILED = 'GET_INGREDIENTS_LIST_FAILED';

export const getIngredients = () => {
	return (dispatch) => {
		dispatch({
			type: GET_INGREDIENTS_LIST,
		});

		fetch(`${BASE_URL}ingredients`)
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					dispatch({
						type: GET_INGREDIENTS_LIST_SUCCESS,
						payload: res.data,
					});
				} else {
					dispatch({
						type: GET_INGREDIENTS_LIST_FAILED,
						error: res,
					});
					throw new Error(`Ошибка ${res.status}`);
				}
			})
			.catch(err => {
				dispatch({
					type: GET_INGREDIENTS_LIST_FAILED,
					error: err,
				});
				console.error(`Произошла ошибка: ${err}`);
			});
	};
};
