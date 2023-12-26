import PropTypes from 'prop-types';

import styles from './form-container.module.css';

const FormContaner = ({ title, children, additionalContent, center = true }) => {
	return (
		<section className={`${styles.container}${center ? ` ${styles.centerContainer}` : ''}`}>
			{title && (
				<h1 className="text text_type_main-medium mb-6">{title}</h1>
			)}
			<form className={styles.form}>
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

FormContaner.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	additionalContent: PropTypes.node,
	center: PropTypes.bool,
};

export default FormContaner;
