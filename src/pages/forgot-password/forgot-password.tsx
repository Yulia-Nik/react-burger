import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';
import { getResponse } from '../../utils/request-utils';
import { BASE_URL, FORGOT_PASSWORD_STORAGE_KEY } from '../../utils/constants';

interface IPasswordResetResponse {
	success: boolean;
	message: string;
}

const ForgotPassword = (): JSX.Element => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setEmail(event.target.value);
	};

	const handleOnSubmit = (event: SyntheticEvent): void => {
		event.preventDefault();

		fetch(`${BASE_URL}password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({email: email})
		})
			.then(res => getResponse<IPasswordResetResponse>(res))
			.then(res => {
				if (res.success) {
					localStorage.setItem(FORGOT_PASSWORD_STORAGE_KEY, 'true');
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
			onSubmit={handleOnSubmit}
		>
			<EmailInput
				value={email}
				name={'email'}
				isIcon={false}
				placeholder="Укажите e-mail"
				onChange={handleOnChange}
			/>
			<Button htmlType="submit" type="primary" size="medium">
				Восстановить
			</Button>
		</FormContaner>
	);
};

export default ForgotPassword;
