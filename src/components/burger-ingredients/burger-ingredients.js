import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';

import styles from './burger-ingredients.module.css';

const getIngredientsGroupTitle = key => {
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

const BurgerIngredients = props => {
	const { ingredients } = useSelector(store => ({
		ingredients: store.ingredients.ingredients
	}));

	const [activeTab, setActiveTab] = useState(1);

	const listRef = useRef(null);
	const bunRef = useRef(null);
	const mainRef = useRef(null);
	const sauceRef = useRef(null);

	const getActiveTabNumber = () => {
		const { current: listCurrent } = listRef;
		const { current: bunCurrent } = bunRef;
		const { current: mainCurrent } = mainRef;
		const { current: sauceCurrent } = sauceRef;
		const group = [
			bunCurrent,
			mainCurrent,
			sauceCurrent,
		];
		const tabY = listCurrent.getBoundingClientRect().top;
		let difference = [];
		group.forEach(el => {
			const top = el.getBoundingClientRect().top;
			difference.push(Math.abs(top - tabY));
		});
		const minValue = Math.min.apply(null, difference);
		const resultIndex = difference.indexOf(minValue) + 1;

		return resultIndex;
	};

	const handleScroll = () => {
		const currentActiveTab = getActiveTabNumber();
		setActiveTab(currentActiveTab);
	};

	useEffect(() => {
		const { current } = listRef;
		current?.addEventListener('scroll', handleScroll);
	});

	return (
		<section className={props.extraClass}>
			<Tabs current={activeTab} />
			<div className={styles.ingredientsContainer} ref={listRef}>
				{ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={ingredients.bun}
						ref={bunRef}
					/>
				)}
				{ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={ingredients.main}
						ref={mainRef}
					/>
				)}
				{ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={ingredients.sauce}
						ref={sauceRef}
					/>
				)}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.object,
	extraClass: PropTypes.string,
};

export default BurgerIngredients;
