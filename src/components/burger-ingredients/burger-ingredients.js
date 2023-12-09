import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import useModal from '../../hooks/useModal';

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

	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<section className={props.extraClass}>
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={ingredients.bun}
						onSelect={openModal}
					/>
				)}
				{ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={ingredients.main}
						onSelect={openModal}
					/>
				)}
				{ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={ingredients.sauce}
						onSelect={openModal}
					/>
				)}
			</div>
			{isModalOpen && (
				<Modal title="Детали ингредиента" onClose={closeModal}>
					<IngredientDetails ingredient={isModalOpen} />
				</Modal>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.object,
	extraClass: PropTypes.string,
};

export default BurgerIngredients;
