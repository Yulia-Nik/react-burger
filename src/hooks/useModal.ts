import { useState, useCallback } from 'react';

interface IUseModalResult {
	isModalOpen: boolean;
	openModal: (data?: boolean) => void;
	closeModal: () => void;
}

const useModal = (): IUseModalResult => {
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
