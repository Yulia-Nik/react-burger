import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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

// describe('Check getUser function', () => {
// 	beforeEach(() => {
// 		jest.spyOn(global, 'fetch').mockResolvedValue({
// 			ok: true,
// 			json: jest.fn().mockResolvedValue({
// 				success: true,
// 				user: {
// 					email: 'example@mail',
// 					name: 'example',
// 				}
// 			})
// 		});
// 	});

// 	afterEach(() => {
// 		jest.restoreAllMocks();
// 	});

// 	test('Should be success', () => {
// 		const middlewares = [thunk];
// 		const mockStore = configureMockStore(middlewares);

// 		fetch.mockImplementationOnce(() => Promise.resolve({
// 			ok: true,
// 			json: () => Promise.resolve({
// 				success: true,
// 				user: {
// 					email: 'example@mail',
// 					name: 'example',
// 				}
// 			}),
// 		}));

// 		const expectedActions = [{
// 			type: actions.SET_USER,
// 			payload: {
// 				email: 'example@mail',
// 				name: 'example',
// 			}
// 		}];
// 		const store = mockStore({ user: null, isAuthChecked: false });

// 		return store.dispatch(actions.getUser()).then(() => {
// 			expect(store.getActions()).toEqual(expectedActions);
// 		});
// 	});
// });

// describe('Check logout function', () => {
// 	beforeEach(() => {
// 		jest.spyOn(global, 'fetch').mockResolvedValue({
// 			ok: true,
// 			json: jest.fn().mockResolvedValue({
// 				success: true,
// 			})
// 		});
// 	});

// 	afterEach(() => {
// 		jest.restoreAllMocks();
// 	});

// 	test('Should be success', () => {
// 		const middlewares = [thunk];
// 		const mockStore = configureMockStore(middlewares);

// 		fetch.mockImplementationOnce(() => Promise.resolve({
// 			ok: true,
// 			json: () => Promise.resolve({
// 				success: true,
// 			}),
// 		}));

// 		const expectedActions = [{
// 			type: actions.SET_USER,
// 			payload: null,
// 		}];
// 		const store = mockStore({ user: {name: 'example'} });

// 		return store.dispatch(actions.logout()).then(() => {
// 			expect(store.getActions()).toEqual(expectedActions);
// 		});
// 	});
// });

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
