import { ThunkAction } from 'redux-thunk';
import { fetchWithRefresh } from '../../utils/auth-utils';
import { BASE_URL, ACCESS_TOKEN_STORAGE_KEY } from '../../utils/constants';
import { IOrderType } from '../../utils/types';
import { IOrderStore } from './reducer';

interface ICreateOrderResponse {
	success: boolean;
	name: string;
	order: IOrderType;
}

interface ICreateOrderAction {
	type: typeof CREATE_ORDER;
}

interface ICreateOrderSuccessAction {
	type: typeof CREATE_ORDER_SUCCESS;
	payload: IOrderType;
}

interface ICreateOrderFailedAction {
	type: typeof CREATE_ORDER_FAILED;
	payload: any;
}

interface IClearOrderInfoAction {
	type: typeof CLEAR_ORDER_INFO;
}

export type TOrderActions = ICreateOrderAction
	| ICreateOrderSuccessAction
	| ICreateOrderFailedAction
	| IClearOrderInfoAction;

export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';

export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';

export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

export const CLEAR_ORDER_INFO: 'CLEAR_ORDER_INFO' = 'CLEAR_ORDER_INFO';

/**
 * Отправляет и обрабатыват запрос на создание заказа
 * 
 * @param {Array} data - массив id ингредиентов бургера
 * @returns {void}
 */
export const createOrder = (data: Array<string>): ThunkAction<void, IOrderStore, unknown, TOrderActions> => {
	return async dispatch => {
		dispatch({
			type: CREATE_ORDER,
		});

		const res: ICreateOrderResponse = await fetchWithRefresh(`${BASE_URL}orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
			body: JSON.stringify({ingredients: data})
		});

		if (res.success) {
			dispatch({
				type: CREATE_ORDER_SUCCESS,
				payload: res.order,
			});
		} else {
			dispatch({
				type: CREATE_ORDER_FAILED,
				payload: res,
			});
			console.error(`Произошла ошибка: ${res}`);
		}
	};
};
