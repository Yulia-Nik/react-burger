import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

const Tabs = ({ current }) => {
	return (
		<div className={styles.tabs}>
			 <Tab value="1" active={current === 1}>
				Булки
			</Tab>
			<Tab value="2" active={current === 2}>
				Соусы
			</Tab>
			<Tab value="3" active={current === 3}>
				Начинки
			</Tab>
		</div>
	);
};

Tabs.propTypes = {
	current: PropTypes.number
};

export default Tabs;