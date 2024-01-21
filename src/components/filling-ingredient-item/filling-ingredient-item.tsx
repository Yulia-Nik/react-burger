import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IBurgerIngredientType } from '../../utils/types';
import ConstructorPart from '../constructor-part/constructor-part';

interface IFillingIngredientItem {
	index: number;
	id: string;
	ingredient: IBurgerIngredientType;
	extraClass?: string;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface IDragObject {
	id: string;
	index: number;
}

interface ICollectedProps {
	isDragging: boolean;
}

const FillingIngredientItem = ({index, id, ingredient, extraClass, moveCard}: IFillingIngredientItem): JSX.Element => {
	const ref = useRef<HTMLLIElement | null>(null);
	const [, dropRef] = useDrop<IDragObject, unknown, unknown>({
		accept: 'ingredient',
		collect: monitor => ({
			handlerId: monitor.getHandlerId(),
			isOver: monitor.isOver(),
		}),
		hover(item) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			moveCard(dragIndex, hoverIndex);

			item.index = hoverIndex;
		}
	});
	const [{ isDragging }, dragRef] = useDrag<IDragObject, unknown, ICollectedProps>({
		type: 'ingredient',
		item: () => {
			return { id, index }
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});
	dragRef(dropRef(ref));

	const opacity = isDragging ? 0 : 1;

	return (
		<li className={extraClass} ref={ref} style={{opacity}}>
			<ConstructorPart ingredient={ingredient} />
		</li>
	);
};

export default FillingIngredientItem;
