import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';
import { getResponse } from '../../utils/request-utils';
import {
	BASE_URL,
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from '../../utils/constants';
import { SET_USER } from '../../services/auth/actions';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [email, setEmail] = useState('');
;	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleOnChange = event => {
		switch (event.target.name) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			case 'name':
				setName(event.target.value);
				break;
			default:
				break;
		};
	};

	const handleOnSubmit = event => {
		event.preventDefault();

		fetch(`${BASE_URL}auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
			})
		})
			.then(res => getResponse(res))
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
			title="Регистрация"
			additionalContent={<FormFooter text="Уже зарегистрированы?" linkText="Войти" path="/login" />}
			onSubmit={handleOnSubmit}
		>
			<Input
				value={name}
				type={'text'}
				placeholder="Имя"
				name={'name'}
				onChange={handleOnChange}
			/>
			<EmailInput
				value={email}
				name={'email'}
				isIcon={false}
				onChange={handleOnChange}
			/>
			<PasswordInput
				value={password}
				name={'password'}
				onChange={handleOnChange}
			/>
			<Button htmlType="submit" type="primary" size="medium">
				Зарегистрироваться
			</Button>
		</FormContaner>
	);
};

export default Register;
