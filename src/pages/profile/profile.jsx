import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import FormContaner from '../../components/form-container/form-container';

const Profile = () => {
	return(
		<>
			<ProfileSidebar />
			<FormContaner center={false}>
				<Input
					type={'text'}
					placeholder="Имя"
					name={'name'}
					value={'John'}
					icon={'EditIcon'}
				/>
				<EmailInput
					// onChange={onChange}
					value={'value@gmail.com'}
					placeholder="Логин"
					name={'email'}
					icon={'EditIcon'}
				/>
				<PasswordInput
					// onChange={onChange}
					value={'value'}
					name={'password'}
					icon={'EditIcon'}
				/>
			</FormContaner>
		</>
	);
};

export default Profile;
