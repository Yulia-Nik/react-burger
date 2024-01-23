import React, { Ref } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IIngredientType } from '../../utils/types';

import styles from './ingredients-group.module.css';

interface IIngedientsGroupProps {
	title: string;
	data: Array<IIngredientType>;
}

const IngredientsGroup = React.forwardRef((props: IIngedientsGroupProps, ref: Ref<HTMLDivElement>): JSX.Element => {
	return (
		<div className="mb-2" ref={ref}>
			<h2>{props.title}</h2>
			<ul className={styles.list}>
				{props.data.map(ingredient =>
					<li className={styles.ingredientItem} key={ingredient._id}>
						<IngredientCard ingredient={ingredient} />
					</li>
				)}
			</ul>
		</div>
	)
});

export default IngredientsGroup;
