import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

const Tabs = () => {
	const [current, setCurrent] = useState('1');

	return (
		<div className={styles.tabs}>
			 <Tab value="1" active={current === '1'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="2" active={current === '2'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="3" active={current === '3'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);
};

export default Tabs;