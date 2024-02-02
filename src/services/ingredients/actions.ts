import { getResponse } from '../../utils/request-utils';
import { BASE_URL } from '../../utils/constants';

interface IGetIngredientsListAction {
	type: typeof GET_INGREDIENTS_LIST;
}

interface IGetIngredientsListSuccessAction {
	type: typeof GET_INGREDIENTS_LIST_SUCCESS;
	payload: any; // поправить
}

interface IGetIngredientsListFailedAction {
	type: typeof GET_INGREDIENTS_LIST_FAILED;
	payload: any;
}

export type TIngredientsActions = IGetIngredientsListAction | IGetIngredientsListSuccessAction | IGetIngredientsListFailedAction;

export const GET_INGREDIENTS_LIST: 'GET_INGREDIENTS_LIST' = 'GET_INGREDIENTS_LIST';

export const GET_INGREDIENTS_LIST_SUCCESS: 'GET_INGREDIENTS_LIST_SUCCESS' = 'GET_INGREDIENTS_LIST_SUCCESS';

export const GET_INGREDIENTS_LIST_FAILED: 'GET_INGREDIENTS_LIST_FAILED' = 'GET_INGREDIENTS_LIST_FAILED';

export const getIngredients = () => {
	// @ts-ignore
	return (dispatch) => {
		dispatch({
			type: GET_INGREDIENTS_LIST,
		});

		fetch(`${BASE_URL}ingredients`)
			.then(res => getResponse(res))
			.then(res => {
				//@ts-ignore
				if (res.success) {
					dispatch({
						type: GET_INGREDIENTS_LIST_SUCCESS,
						//@ts-ignore
						payload: res.data,
					});
				} else {
					dispatch({
						type: GET_INGREDIENTS_LIST_FAILED,
						payload: res,
					});
					//@ts-ignore
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
