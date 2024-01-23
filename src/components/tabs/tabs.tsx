import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

interface ITabsProps {
	current: number;
	onClick: (value: number) => void;
}

const Tabs = ({ current, onClick }: ITabsProps): JSX.Element => {
	return (
		<div className={styles.tabs}>
			<Tab value="1" active={current === 1} onClick={() => onClick(1)}>
				Булки
			</Tab>
			<Tab value="2" active={current === 2} onClick={() => onClick(2)}>
				Начинки
			</Tab>
			<Tab value="3" active={current === 3} onClick={() => onClick(3)}>
				Соусы
			</Tab>
		</div>
	);
};

export default Tabs;