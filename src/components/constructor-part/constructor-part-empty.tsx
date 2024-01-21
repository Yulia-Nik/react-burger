import { ReactNode } from 'react';

import styles from './constructor-part.module.css';

interface IConstructorPartEmptyProps {
	outline: string;
	children?: ReactNode;
};

const ConstructorPartEmpty = ({ outline, children }: IConstructorPartEmptyProps): JSX.Element => {

	return (
		<div className={styles.wrap}>
			<div className={`constructor-element ${styles.emptyContainer}`} style={{outline}}>{children}</div>
		</div>
	);
};

export default ConstructorPartEmpty;
