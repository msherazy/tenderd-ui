import type { Vehicle } from '../types';

export const StatusBadge = ({ status }: { status: Vehicle['status']; className?: string }) => {
	const colorMap = {
		Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		Maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
		Inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[status]}`}
		>
			{status}
		</span>
	);
};

export const VehicleTypeBadge = ({ type }: { type: Vehicle['type'] }) => {
	const colorMap = {
		Sedan: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
		SUV: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		Truck: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
		Van: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
		Electric: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[type]}`}
		>
			{type}
		</span>
	);
};
