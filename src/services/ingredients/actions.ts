import { getResponse } from '../../utils/request-utils';
import { BASE_URL } from '../../utils/constants';
import { IIngredientType } from '../../utils/types';

interface IGetIngredientsResponse {
	success: boolean;
	data: Array<IIngredientType>;
	status?: string;
}

interface IGetIngredientsListAction {
	type: typeof GET_INGREDIENTS_LIST;
}

interface IGetIngredientsListSuccessAction {
	type: typeof GET_INGREDIENTS_LIST_SUCCESS;
	payload: any;
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
			.then((res: Response): Promise<IGetIngredientsResponse> => getResponse(res))
			.then((res: IGetIngredientsResponse): void => {
				if (res.success) {
					dispatch({
						type: GET_INGREDIENTS_LIST_SUCCESS,
						payload: res.data,
					});
				} else {
					dispatch({
						type: GET_INGREDIENTS_LIST_FAILED,
						payload: res,
					});

					throw new Error(`Ошибка ${res.status}`);
				}
			})
			.catch(err => {
				dispatch({
					type: GET_INGREDIENTS_LIST_FAILED,
					payload: err,
				});
				console.error(`Произошла ошибка: ${err}`);
			});
	};
};
