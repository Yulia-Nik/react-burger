import { useState, useCallback } from 'react';

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = useCallback((data = true) => {
		setIsModalOpen(data);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};

export default useModal;
