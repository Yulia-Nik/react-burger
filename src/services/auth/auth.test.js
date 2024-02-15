import * as actions from './actions';
import { authReducer as reducer } from './reducer';

describe('Auth action creators', () => {
	it('setAuthChecked with value true', () => {
		const value = true;

		const expectedAction = {
			type: actions.SET_AUTH_CHECKED,
			payload: value,
		};

		expect(actions.setAuthChecked(value)).toEqual(expectedAction);
	});

	it('setUser witch user data', () => {
		const user = {
			email: 'example@mail',
			name: 'example',
		};

		const expectedAction = {
			type: actions.SET_USER,
			payload: user,
		};

		expect(actions.setUser(user)).toEqual(expectedAction);
	});
});

describe('Auth reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			user: null,
			isAuthChecked: false,
		});
	});

	it('Should handle SET_AUTH_CHECKED', () => {
		expect(reducer({}, {
			type: actions.SET_AUTH_CHECKED,
			payload: false,
		})).toEqual({
			isAuthChecked: false,
		});
	});

	it('Should handle SET_USER', () => {
		expect(reducer(
			{
				isAuthChecked: false,
			},
			{
				type: actions.SET_USER,
				payload: {
					email: 'example@mail',
					name: 'example',
				},
			}
		)).toEqual({
			isAuthChecked: false,
			user: {
				email: 'example@mail',
				name: 'example',
			},
		});
	});
});
