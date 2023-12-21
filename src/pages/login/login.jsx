import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContaner from '../../components/form-container/form-container';
import FormFooter from '../../components/form-footer/form-footer';

const additionalContent = (
	<>
		<FormFooter text="Вы — новый пользователь?" linkText="Зарегистрироваться" path="/register" />
		<FormFooter text="Забыли пароль?" linkText="Восстановить пароль" path="/" />
	</>
);

const Login = () => {
	return (
		<FormContaner
			title="Вход"
			additionalContent={additionalContent}
		>
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
				extraClass="mb-2"
			/>
			<Button htmlType="button" type="primary" size="medium">
				Войти
			</Button>
		</FormContaner>
	);
};

export default Login;
