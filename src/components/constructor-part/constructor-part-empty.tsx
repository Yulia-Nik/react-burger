import { PropsWithChildren } from 'react';

import styles from './constructor-part.module.css';

interface IConstructorPartEmptyProps extends PropsWithChildren {
	outline: string;
};

const ConstructorPartEmpty = ({ outline, children }: IConstructorPartEmptyProps): JSX.Element => {

	return (
		<div className={styles.wrap}>
			<div className={`constructor-element ${styles.emptyContainer}`} style={{outline}}>{children}</div>
		</div>
	);
};

export default ConstructorPartEmpty;
