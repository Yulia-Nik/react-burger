import styles from './luminous-text.module.css';

interface ILuminousTextProps {
	text: string | number;
	type?: 'default' | 'medium' | 'large';
	extraClass?: string;
}

const LuminousText = ({ text, type, extraClass }: ILuminousTextProps): JSX.Element => {
	return (
		<p className={`text text_type_digits-${type || 'default'} ${styles.shine} ${extraClass ? extraClass : ''}`}>{text}</p>
	);
};

export default LuminousText;
