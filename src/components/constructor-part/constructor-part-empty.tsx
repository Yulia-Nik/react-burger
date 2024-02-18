import { PropsWithChildren } from 'react';

import styles from './constructor-part.module.css';

interface IConstructorPartEmptyProps extends PropsWithChildren {
	outline: string;
	name?: string;
};

const ConstructorPartEmpty = ({ outline, name, children }: IConstructorPartEmptyProps): JSX.Element => {

	return (
		<div className={styles.wrap}>
			<div className={`constructor-element ${styles.emptyContainer}`} style={{outline}} data-name={name}>{children}</div>
		</div>
	);
};

export default ConstructorPartEmpty;
