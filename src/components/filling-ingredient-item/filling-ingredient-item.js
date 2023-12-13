import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ConstructorPart from '../constructor-part/constructor-part';

const FillingIngredientItem = ({index, id, ingredient, extraClass, moveCard}) => {
	const ref = useRef(null);
	const [, dropRef] = useDrop({
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
	const [{ isDragging }, dragRef] = useDrag({
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
			<ConstructorPart ingredient={ingredient} additionalClass="mb-4" />
		</li>
	);
};

export default FillingIngredientItem;
