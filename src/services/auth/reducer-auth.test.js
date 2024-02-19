import * as actions from './actions';
import { authReducer as reducer } from './reducer';

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
