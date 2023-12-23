import { NavLink } from 'react-router-dom';

import styles from './profile-sidebar.module.css';

const ProfileSidebar = () => {
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
						className={`${styles.link}`}
					>
						История заказов
					</NavLink>
				</li>
				<li>
					<NavLink className={`${styles.link}`}>Выход</NavLink>
				</li>
			</ul>
			<div className={`${styles.caption} mt-20`}>
				В этом разделе вы можете изменить свои персональные данные
			</div>
		</aside>
	);
};

export default ProfileSidebar;
