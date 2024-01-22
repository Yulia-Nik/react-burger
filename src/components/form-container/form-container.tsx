import { FormEvent, PropsWithChildren, ReactNode } from 'react';

import styles from './form-container.module.css';

interface IFormContainerProps extends PropsWithChildren {
	title?: string;
	additionalContent?: ReactNode;
	center?: boolean;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const FormContainer = ({ title, children, additionalContent, onSubmit, center = true }: IFormContainerProps): JSX.Element => {
	return (
		<section className={`${styles.container}${center ? ` ${styles.centerContainer}` : ''}`}>
			{title && (
				<h1 className="text text_type_main-medium mb-6">{title}</h1>
			)}
			<form className={styles.form} onSubmit={onSubmit}>
				{children}
			</form>
			{additionalContent && (
				<div className={`${styles.additional} mt-20`}>
					{additionalContent}
				</div>
			)}
		</section>
	);
};

export default FormContainer;
