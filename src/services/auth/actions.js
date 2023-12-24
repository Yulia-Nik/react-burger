const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const GET_USER = 'GET_USER';

export const SET_USER = 'SET_USER';

export const DELETE_USER = 'DELETE_USER';

export const setAuthChecked = value => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const getUser = () => {
	return (dispatch) => {
		return dispatch({
			type: GET_USER,
		});
	};
};

export const setUser = user => ({
	type: SET_USER,
	payload: user,
});
