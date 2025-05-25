import type { Vehicle } from '../types';

export const StatusBadge = ({ status }: { status: Vehicle['status']; className?: string }) => {
	const colorMap = {
		Active: 'bg-green-100 text-green-800',
		Maintenance: 'bg-yellow-100 text-yellow-800',
		Inactive: 'bg-red-100 text-red-800',
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
		Sedan: 'bg-blue-100 text-blue-800',
		SUV: 'bg-green-100 text-green-800',
		Truck: 'bg-yellow-100 text-yellow-800',
		Van: 'bg-purple-100 text-purple-800',
		Electric: 'bg-teal-100 text-teal-800',
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[type]}`}
		>
			{type}
		</span>
	);
};
