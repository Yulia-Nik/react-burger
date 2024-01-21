import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './form-footer.module.css';

interface IFormFooterProps {
	text: string;
	linkText: string;
	path: string;
}

const FormFooter = ({ text, linkText, path }: IFormFooterProps): JSX.Element => {
	const navigate = useNavigate();

	const handleOnClick = (): void => navigate(path);

	return (
		<div className={styles.container}>
			<span className="pr-2">{text}</span>
			<Button htmlType="button" type="secondary" size="medium" extraClass={styles.btn} onClick={handleOnClick}>
				{linkText}
			</Button>
		</div>
	);
};

export default FormFooter;
