import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = ({extraClass = ''}) => {
	return (
		<header className={styles.header}>
			<div className={`${styles.headerMenu}${extraClass ? ` ${extraClass}` : ''}`}>
				<div className={styles.headerMenuItem}>
					<div className={styles.headerMenuGroup}>
						<NavLink to="" className={({isActive}) => isActive ? styles.activeMenuItem : styles.menuItem}>
							{({isActive}) => (
								<>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
									Конструктор
								</>
							)}
						</NavLink>
						<NavLink to="/feed" className={({isActive}) => isActive ? styles.activeMenuItem : styles.menuItem}>
							{({isActive}) => (
								<>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
									Лента заказов
								</>
							)}
						</NavLink>
					</div>
				</div>
				<div className={styles.headerMenuItem}>
					<NavLink to="">
						<Logo />
					</NavLink>
				</div>
				<div className={styles.headerMenuItem}>
					<NavLink to="/profile" className={({isActive}) => isActive ? styles.activeMenuItem : styles.menuItem}>
						{({isActive}) => (
							<>
								<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
								Личный кабинет
							</>
						)}
					</NavLink>
				</div>
			</div>
		</header>
	);
};

AppHeader.propTypes = {
	extraClass: PropTypes.string,
};

export default AppHeader;
