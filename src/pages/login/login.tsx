import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';
import { getResponse } from '../../utils/request-utils';
import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from '../../utils/constants';
import { ILoginResponse } from '../../utils/types';
import { SET_USER } from '../../services/auth/actions';
import { useDispatch } from '../../services/store';

const additionalContent = (
	<>
		<FormFooter text="Вы — новый пользователь?" linkText="Зарегистрироваться" path="/register" />
		<FormFooter text="Забыли пароль?" linkText="Восстановить пароль" path="/forgot-password" />
	</>
);

const Login = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
		switch (event.target.name) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			default:
				break;
		};
	};

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		fetch(`${BASE_URL}auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				email: email,
				password: password,
			})
		})
			.then(res => getResponse<ILoginResponse>(res))
			.then(res => {
				if (res.success) {
					dispatch({
						type: SET_USER,
						payload: res.user,
					});
					localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, res.accessToken.split('Bearer ')[1]);
					localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, res.refreshToken);
					navigate('/');
				} else {
					throw new Error(`Ошибка ${res.message}`);
				}
			})
			.catch(err => {
				console.error(`Произошла ошибка: ${err}`);
			});
	};

	return (
		<FormContaner
			title="Вход"
			additionalContent={additionalContent}
			onSubmit={handleOnSubmit}
		>
			<EmailInput
				value={email}
				name={'email'}
				isIcon={false}
				onChange={handleOnChange}
			/>
			<PasswordInput
				value={password}
				name={'password'}
				extraClass="mb-2"
				onChange={handleOnChange}
			/>
			<Button htmlType="submit" type="primary" size="medium">
				Войти
			</Button>
		</FormContaner>
	);
};

export default Login;
