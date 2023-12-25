import { useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import FormContaner from '../../components/form-container/form-container';
import { updateUserInfo } from '../../services/auth/actions';

import styles from './profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const inputNameRef = useRef(null);
	const inputEmailRef = useRef(null);
	const user = useSelector(store => store.auth.user);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const hasChange = useMemo(() => {
		return name || email;
	}, [name, email]);

	const handleOnChange = event => {
		switch (event.target.name) {
			case 'name':
				setName(event.target.value);
				break;
			case 'email':
				setEmail(event.target.value);
				break;
			default:
				break;
		};
	};

	const handleOnCancel = () => {
		inputNameRef.current.value = user?.name || '';
		inputEmailRef.current.value = user?.email || '';

		setName('');
		setEmail('');
	};

	const handleOnSave = () => {
		dispatch(updateUserInfo({
			name: name || user.name,
			email: email || user.email,
		}));

		setName('');
		setEmail('');
	};

	return(
		<>
			<ProfileSidebar />
			<FormContaner center={false}>
				<Input
					type={'text'}
					placeholder="Имя"
					name={'name'}
					value={user?.name}
					icon={'EditIcon'}
					ref={inputNameRef}
					onChange={handleOnChange}
				/>
				<EmailInput
					value={user?.email}
					placeholder="Логин"
					name={'email'}
					icon={'EditIcon'}
					ref={inputEmailRef}
					onChange={handleOnChange}
				/>
				<PasswordInput
					onChange={handleOnChange}
					value={''}
					placeholder="Пароль"
					name={'password'}
					icon={'EditIcon'}
				/>
				<div className={`${styles.btns} ${hasChange ? '' : styles.hidden}`}>
					<Button htmlType="button" type="secondary" size="medium" extraClass="mr-5" onClick={handleOnCancel}>
						Отмена
					</Button>
					<Button htmlType="button" type="primary" size="medium" onClick={handleOnSave}>
						Сохранить
					</Button>
				</div>
			</FormContaner>
		</>
	);
};

export default Profile;
