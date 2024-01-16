import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './form-footer.module.css';

const FormFooter = ({ text, linkText, path }) => {
	const navigate = useNavigate();

	const handleOnClick = () => navigate(path);

	return (
		<div className={styles.container}>
			<span className="pr-2">{text}</span>
			<Button htmlType="button" type="secondary" size="medium" extraClass={styles.btn} onClick={handleOnClick}>
				{linkText}
			</Button>
		</div>
	);
};

FormFooter.propTypes = {
	text: PropTypes.string,
	linkText: PropTypes.string,
	path: PropTypes.string,
}

export default FormFooter;
