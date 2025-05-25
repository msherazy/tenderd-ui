import React from 'react';
import { t } from '../utils/locale';

export const Footer: React.FC = () => {
	return (
		<footer className="bg-white border-t border-gray-200 py-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<p className="text-center text-sm text-gray-500 ">
					© {new Date().getFullYear()} - {t('FOOTER_DEMO_TEXT')}
				</p>
			</div>
		</footer>
	);
};
