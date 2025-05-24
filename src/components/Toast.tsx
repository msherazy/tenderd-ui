import React from 'react';

export interface ToastProps {
	message: string;
	onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
	React.useEffect(() => {
		const timer = setTimeout(onClose, 4000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-2 animate-fade-in">
			<span>{message}</span>
			<button onClick={onClose} className="ml-2 text-white font-bold">
				&times;
			</button>
		</div>
	);
};
