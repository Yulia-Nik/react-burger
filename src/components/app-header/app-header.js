import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderMenuLink from '../header-menu-link/header-menu-link';

import styles from './app-header.module.css';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerMenu}>
				<div className={styles.headerMenuItem}>
					<div className={styles.headerMenuGroup}>
						<HeaderMenuLink title="Конструктор">
							<BurgerIcon type="secondary" />
						</HeaderMenuLink>
						<HeaderMenuLink title="Лента заказов">
							<ListIcon type="secondary" />
						</HeaderMenuLink>
					</div>
				</div>
				<div className={styles.headerMenuItem}>
					<Logo />
				</div>
				<div className={styles.headerMenuItem}>
					<HeaderMenuLink title="Личный кабинет">
						<ProfileIcon type="secondary" />
					</HeaderMenuLink>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
