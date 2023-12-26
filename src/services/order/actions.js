import { getResponse } from '../../utils/request-utils';
import { BASE_URL, ACCESS_TOKEN_STORAGE_KEY } from '../../utils/constants';

export const CREATE_ORDER = 'CREATE_ORDER';

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';

export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';

/**
 * Отправляет и обрабатыват запрос на создание заказа
 * 
 * @param {Array} data - массив id ингредиентов бургера
 * @returns {void}
 */
export const createOrder = data => {
	return (dispatch) => {
		dispatch({
			type: CREATE_ORDER,
		});

		fetch(`${BASE_URL}orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
			body: JSON.stringify({ingredients: data})
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					dispatch({
						type: CREATE_ORDER_SUCCESS,
						payload: res.order,
					});
				} else {
					dispatch({
						type: CREATE_ORDER_FAILED,
						error: res,
					});
					throw new Error(`Ошибка ${res.status}`);
				}
			})
			.catch(err => {
				dispatch({
					type: CREATE_ORDER_FAILED,
					error: err,
				});
				console.error(`Произошла ошибка: ${err}`);
			});
	};
};

