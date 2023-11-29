import PropTypes from 'prop-types';
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
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<section className={props.extraClass}>
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{props.ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={props.ingredients.bun}
						onSelect={openModal}
					/>
				)}
				{props.ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={props.ingredients.main}
						onSelect={openModal}
					/>
				)}
				{props.ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={props.ingredients.sauce}
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
