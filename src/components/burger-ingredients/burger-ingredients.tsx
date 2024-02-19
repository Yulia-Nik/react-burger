import { useEffect, useRef, useState } from 'react';
import { useSelector } from '../../services/store';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';

import styles from './burger-ingredients.module.css';

interface IBurgerIngredientsProps {
	extraClass?: string;
};

const getIngredientsGroupTitle = (key: string): string => {
	switch(key) {
		case 'bun':
			return 'Булки';
			break;
		case 'main':
			return 'Начинки';
			break;
		case 'sauce':
			return 'Соусы';
			break;
		default:
			return '';
			break;
	};
};

const BurgerIngredients = (props: IBurgerIngredientsProps): JSX.Element => {
	const { ingredients } = useSelector(store => ({
		ingredients: store.ingredients.ingredients
	}));

	const [activeTab, setActiveTab] = useState<number>(1);

	const listRef = useRef<HTMLDivElement | null>(null);
	const bunRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);

	const getActiveTabNumber = () => {
		const { current: listCurrent } = listRef;
		const { current: bunCurrent } = bunRef;
		const { current: mainCurrent } = mainRef;
		const { current: sauceCurrent } = sauceRef;
		const group: Array<HTMLDivElement | null> = [
			bunCurrent,
			mainCurrent,
			sauceCurrent,
		];
		const tabY: number = listCurrent?.getBoundingClientRect().top || 0;
		let difference: Array<number> = [];
		group.forEach(el => {
			const top = el?.getBoundingClientRect().top || 0;
			difference.push(Math.abs(top - tabY));
		});
		const minValue = Math.min.apply(null, difference);
		const resultIndex = difference.indexOf(minValue) + 1;

		return resultIndex;
	};

	const handleScroll = (): void => {
		const currentActiveTab = getActiveTabNumber();
		setActiveTab(currentActiveTab);
	};

	useEffect(() => {
		const { current } = listRef;
		current?.addEventListener('scroll', handleScroll);
	});

	return (
		<section className={props.extraClass}>
			<Tabs current={activeTab} onClick={setActiveTab} />
			<div className={styles.ingredientsContainer} ref={listRef}>
				{ingredients && ingredients.bun && ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={ingredients.bun}
						ref={bunRef}
						name="bun"
					/>
				)}
				{ingredients && ingredients.main && ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={ingredients.main}
						ref={mainRef}
						name="main"
					/>
				)}
				{ingredients && ingredients.sauce && ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={ingredients.sauce}
						ref={sauceRef}
						name="sauce"
					/>
				)}
			</div>
		</section>
	);
};

export default BurgerIngredients;
