import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './ingredient-card.module.css';

const IngredientCard = props => {
	const [showDetails, setShowDetails] = useState(false);

	const ingredientsCardRef = useRef();

	const handleModalOpen = () => {
		setShowDetails(true);
	};

	const handleModalClose = () => {
		setShowDetails(false);
	};

	return (
		<>
			<div className={styles.ingredientCard} ref={ingredientsCardRef} onClick={handleModalOpen}>
				<img alt={props.alt} src={props.image} />
				<Price price={props.price} />
				<div className={styles.name}>{props.name}</div>
				{props.count && (
					<Counter count={props.count} />
				)}
			</div>
			{showDetails && (
				<Modal onClose={handleModalClose}>
					<IngredientDetails {...props} />
				</Modal>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	alt: PropTypes.string,
	src: PropTypes.any,
	price: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	name: PropTypes.string,
	count: PropTypes.number,
};

export default IngredientCard;
