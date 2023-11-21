import PropTypes from 'prop-types';

import styles from './header-menu-link.module.css';

const HeaderMenuLink = (props) => {
	return (
		<a className={styles.menuItem} href={props.href}>
			{props.children}
			{props.title}
		</a>
	);
}

HeaderMenuLink.propTypes = {
	href: PropTypes.string,
	title: PropTypes.string,
};

export default HeaderMenuLink;
