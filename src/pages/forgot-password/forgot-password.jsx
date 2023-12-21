import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';

const ForgotPassword = () => {
	return (
		<FormContaner
			title="Восстановление пароля"
			additionalContent={<FormFooter text="Вспомнили пароль?" linkText="Войти" path="/login" />}
		>
			<EmailInput
				// onChange={onChange}
				// value={value}
				name={'email'}
				isIcon={false}
				placeholder="Укажите e-mail"
			/>
			<Button htmlType="button" type="primary" size="medium">
				Восстановить
			</Button>
		</FormContaner>
	);
};

export default ForgotPassword;
