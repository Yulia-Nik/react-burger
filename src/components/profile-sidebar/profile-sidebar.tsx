import { NavLink } from 'react-router-dom';
import { logout } from '../../services/auth/actions';
import { useDispatch } from '../../services/store';

import styles from './profile-sidebar.module.css';

const ProfileSidebar = (): JSX.Element => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		// @ts-ignore
		dispatch(logout());
	};

	return (
		<aside className={styles.sidebar}>
			<ul className={styles.list}>
				<li>
					<NavLink
						to="/profile"
						className={({isActive}) => isActive ? styles.activeLink : styles.link}
					>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/profile/orders"
						className={({isActive}) => isActive ? styles.activeLink : styles.link}
					>
						История заказов
					</NavLink>
				</li>
				<li>
					<span className={`${styles.link}`} onClick={handleLogout}>Выход</span>
				</li>
			</ul>
			<div className={`${styles.caption} mt-20`}>
				В этом разделе вы можете изменить свои персональные данные
			</div>
		</aside>
	);
};

export default ProfileSidebar;
