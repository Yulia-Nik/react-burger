import styles from './ingredient-icon.module.css';

interface IIngredientIconProps {
	src: string,
	residue?: number;
}

const IngredientIcon = ({ src, residue }: IIngredientIconProps): JSX.Element => {
	return (
		<div className={styles.icon}>
			<img className={styles.img} src={src} alt="Ингредиент" />
			{Boolean(residue) && (
				<>
					<div className={styles.blur}></div>
					<span className={styles.counter}>+{residue}</span>
				</>
			)}
		</div>
	);
};

export default IngredientIcon;
