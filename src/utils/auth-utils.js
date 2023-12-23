import { BASE_URL } from './constants';
import { getResponse } from './request-utils';

// export const getUser = () => {
//     fetch(`${BASE_URL}ingredients`)
// 			.then(res => getResponse(res))
// 			.then(res => {
// 				if (res.success) {
// 					dispatch({
// 						type: GET_INGREDIENTS_LIST_SUCCESS,
// 						payload: res.data,
// 					});
// 				} else {
// 					dispatch({
// 						type: GET_INGREDIENTS_LIST_FAILED,
// 						error: res,
// 					});
// 					throw new Error(`Ошибка ${res.status}`);
// 				}
// 			})
// 			.catch(err => {
// 				dispatch({
// 					type: GET_INGREDIENTS_LIST_FAILED,
// 					error: err,
// 				});
// 				console.error(`Произошла ошибка: ${err}`);
// 			});
// }