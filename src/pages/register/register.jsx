import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';

const Register = () => {
	return (
		<FormContaner
			title="Регистрация"
			additionalContent={<FormFooter text="Уже зарегистрированы?" linkText="Войти" path="/login" />}
		>
			<Input
				type={'text'}
				placeholder="Имя"
				name={'name'}
			/>
			<EmailInput
				// onChange={onChange}
				// value={value}
				name={'email'}
				isIcon={false}
			/>
			<PasswordInput
				// onChange={onChange}
				// value={value}
				name={'password'}
			/>
			<Button htmlType="button" type="primary" size="medium">
				Зарегистрироваться
			</Button>
		</FormContaner>
	);
};

export default Register;
