import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';
import { getResponse } from '../../utils/request-utils';
import { BASE_URL, FORGOT_PASSWORD_STORAGE_KEY } from '../../utils/constants';

const ResetPassword = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const handleOnChange = event => {
		switch (event.target.name) {
			case 'password':
				setPassword(event.target.value);
				break;
			case 'code':
				setCode(event.target.value);
				break;
			default:
				break;
		};
	};

	const handleOnSubmit = event => {
		event.preventDefault();

		fetch(`${BASE_URL}password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				password: password,
				token: code,
			})
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					navigate('/profile');
				} else {
					throw new Error(`Ошибка ${res.message}`);
				}
			})
			.catch(err => {
				console.error(`Произошла ошибка: ${err}`);
			})
			.finally(() => localStorage.removeItem(FORGOT_PASSWORD_STORAGE_KEY));
	};

	useEffect(() => {
		if (!localStorage.getItem(FORGOT_PASSWORD_STORAGE_KEY)) {
			navigate('/', {replace: true});
		}
	}, []);

	return (
		<FormContaner
			title="Восстановление пароля"
			additionalContent={<FormFooter text="Вспомнили пароль?" linkText="Войти" path="/login" />}
			onSubmit={handleOnSubmit}
		>
			<PasswordInput
				value={password}
				name={'password'}
				placeholder="Введите новый пароль"
				onChange={handleOnChange}
			/>
			<Input
				value={code}
				type={'text'}
				placeholder="Введите код из письма"
				name={'code'}
				onChange={handleOnChange}
			/>
			<Button htmlType="submit" type="primary" size="medium">
				Сохранить
			</Button>
		</FormContaner>
	);
};

export default ResetPassword;
