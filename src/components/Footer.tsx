import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<p className="text-center text-sm text-gray-500 dark:text-gray-400">
					© {new Date().getFullYear()} - Copyright reserved only for demo purpose
				</p>
			</div>
		</footer>
	);
};
