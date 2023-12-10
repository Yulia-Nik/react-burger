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
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			// Лишнее?
			// const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// const clientOffset = monitor.getClientOffset();
			// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			// 	return;
			// }

			// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			// 	return;
			// }

			moveCard(dragIndex, hoverIndex);

			item.index = hoverIndex
		}
	});
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: () => {
			return { id, index }
		},
		collect: monitor => ({
			isDragging: id === monitor.getItem()?.id, // или monitor.isDragging() ?
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
