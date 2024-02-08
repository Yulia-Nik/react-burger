import { useState, useMemo, useRef, ChangeEvent, FormEvent } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import FormContaner from '../../components/form-container/form-container';
import { updateUserInfo } from '../../services/auth/actions';
import { useDispatch, useSelector } from '../../services/store';

import styles from './profile.module.css';

const Profile = (): JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector(store => store.auth.user);
	const [name, setName] = useState<string>(user?.name || '');
	const [email, setEmail] = useState<string>(user?.email || '');
	const [password, setPassword] = useState<string>(user?.password || '');
	const nameInputRef = useRef<HTMLInputElement | null>(null);

	const hasChange = useMemo<boolean>(() => {
		return (
			name !== user?.name
			|| email !== user?.email
			|| !!password
		);
	}, [name, email, password, user]);

	const onIconClick = (): void => {
		const { current } = nameInputRef;
		if (current) {
			current.disabled = false;
			current.focus();
		}
	};

	const handleOnBlur = (): void => {
		const { current } = nameInputRef;
		if (current) {
			current.disabled = true;
		}
	};

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
		switch (event.target.name) {
			case 'name':
				setName(event.target.value);
				break;
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			default:
				break;
		};
	};

	const handleOnCancel = (): void => {
		setName(user?.name || '');
		setEmail(user?.email || '');
		setPassword('');
	};

	const handleOnSave = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		//@ts-ignore
		dispatch(updateUserInfo({
			name: name || user?.name,
			email: email || user?.email,
			password: password || '',
		}));
	};

	return(
		<>
			<ProfileSidebar />
			<FormContaner
				center={false}
				onSubmit={handleOnSave}
			>
				<Input
					type={'text'}
					placeholder="Имя"
					name={'name'}
					value={name}
					icon={'EditIcon'}
					disabled={true}
					ref={nameInputRef}
					onIconClick={onIconClick}
					onChange={handleOnChange}
					onBlur={handleOnBlur}
					extraClass={'input__textfield-disabled'}
				/>
				<EmailInput
					value={email}
					name={'email'}
					placeholder="Логин"
					isIcon={true}
					extraClass="mb-2"
					onChange={handleOnChange}
				/>
				<PasswordInput
					value={password}
					placeholder="Пароль"
					name={'password'}
					icon={'EditIcon'}
					onChange={handleOnChange}
				/>
				<div className={`${styles.btns} ${hasChange ? '' : styles.hidden}`}>
					<Button htmlType="button" type="secondary" size="medium" extraClass="mr-5" onClick={handleOnCancel}>
						Отмена
					</Button>
					<Button htmlType="submit" type="primary" size="medium">
						Сохранить
					</Button>
				</div>
			</FormContaner>
		</>
	);
};

export default Profile;
