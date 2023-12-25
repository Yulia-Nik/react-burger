import { useState } from 'react';
import { useNavigate } from 'react-router';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';
import { getResponse } from '../../utils/request-utils';
import { BASE_URL, FORGOT_PASSWORD_STORAGE_KEY } from '../../utils/constants';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const handleOnChange = event => {
		setEmail(event.target.value);
	};

	const handleOnClick = () => {
		fetch(`${BASE_URL}password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({email: email})
		})
			.then(res => getResponse(res))
			.then(res => {
				if (res.success) {
					localStorage.setItem(FORGOT_PASSWORD_STORAGE_KEY, true);
					navigate('/reset-password');
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
			title="Восстановление пароля"
			additionalContent={<FormFooter text="Вспомнили пароль?" linkText="Войти" path="/login" />}
		>
			<EmailInput
				value={email}
				name={'email'}
				isIcon={false}
				placeholder="Укажите e-mail"
				onChange={handleOnChange}
			/>
			<Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
				Восстановить
			</Button>
		</FormContaner>
	);
};

export default ForgotPassword;
