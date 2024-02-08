import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, UnknownAction } from 'redux';
import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from '../../utils/constants';
import { getResponse } from '../../utils/request-utils';
import { IUserData } from '../../utils/types';
import { fetchWithRefresh } from '../../utils/auth-utils';
import { AppDispatch, store } from '../store';
import { IAuthStore } from './reducer';

interface ISetAuthCheckedAction {
	type: typeof SET_AUTH_CHECKED;
	payload: boolean;
}

interface ISetUser {
	type: typeof SET_USER;
	payload: null | IUserData;
}

interface IUserDataResponse {
	success: boolean;
	user: IUserData;
}

interface ILogoutResponse {
	success: boolean;
	message: string;
}

export type TAuthActions = ISetUser | ISetAuthCheckedAction;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturnType = void> = ActionCreator<
	ThunkAction<TReturnType, Action, RootState, TAuthActions>
>;

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';

export const SET_USER: 'SET_USER' = 'SET_USER';

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user: null | IUserData): ISetUser => ({
	type: SET_USER,
	payload: user,
});

export const getUser = (): ThunkAction<void, IAuthStore, unknown, TAuthActions> => {
	return async dispatch => {
		try {
			const res: IUserDataResponse = await fetchWithRefresh(`${BASE_URL}auth/user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
				},
			});

			if (res.success) {
				dispatch(setUser(res.user));
			} else {
				dispatch(setUser(null));
				localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
				localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
			}
		} catch (err) {
			dispatch(setUser(null));
			localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
			localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
		}
	};
};

export const checkUserAuth = () => {
	//@ts-ignore
	return dispatch => {
		if (localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)) {
			dispatch(setAuthChecked(true));
			dispatch(getUser());
		} else {
			dispatch(setAuthChecked(true));
			dispatch(setUser(null));
		}
	};
};

export const logout = (): ThunkAction<void, IAuthStore, unknown, TAuthActions> => {
	return dispatch =>
		fetch(`${BASE_URL}auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({token: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)})
		})
			.then((res: Response): Promise<ILogoutResponse> => getResponse(res))
			.then((res: ILogoutResponse): void => {
				if (res.success) {
					localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
					localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
					dispatch(setUser(null));
				}
			});
};

export const updateUserInfo = (data: IUserData): ThunkAction<void, IAuthStore, unknown, TAuthActions> => {
	return async dispatch => {
		const res: IUserDataResponse = await fetchWithRefresh(`${BASE_URL}auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
			},
			body: JSON.stringify(data)
		});

		if (res.success) {
			dispatch(setUser(res.user));
		}
	};
};
