import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';

const ResetPassword = () => {
	return (
		<FormContaner
			title="Восстановление пароля"
			additionalContent={<FormFooter text="Вспомнили пароль?" linkText="Войти" path="/login" />}
		>
			<PasswordInput
				// onChange={onChange}
				// value={value}
				name={'password'}
				isIcon={false}
				placeholder="Введите новый пароль"
			/>
			<Input
				type={'text'}
				placeholder="Введите код из письма"
				name={'code'}
			/>
			<Button htmlType="button" type="primary" size="medium">
				Сохранить
			</Button>
		</FormContaner>
	);
};

export default ResetPassword;
