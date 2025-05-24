import React from 'react';
import type { Vehicle } from '../types';
import { StatusBadge, VehicleTypeBadge } from './Badges.tsx';
import { EmptyState, ErrorMessage, LoadingSpinner } from './Card/Card.tsx';

interface VehicleListProps {
	vehicles: Vehicle[];
	loading: boolean;
	error: string | null;
	sortField: keyof Vehicle;
	sortDirection: 'asc' | 'desc';
	onVehicleSelect: (vehicle: Vehicle) => void;
	onSort: (field: keyof Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({
	vehicles,
	loading,
	error,
	sortField,
	sortDirection,
	onVehicleSelect,
	onSort,
}) => {
	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} />;
	if (vehicles.length === 0) return <EmptyState />;

	const renderSortIndicator = (field: keyof Vehicle) => {
		if (sortField !== field) return null;
		return sortDirection === 'asc' ? '↑' : '↓';
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
				<thead className="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
							onClick={() => onSort('make')}
						>
							Make {renderSortIndicator('make')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
							onClick={() => onSort('model')}
						>
							Model {renderSortIndicator('model')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
							onClick={() => onSort('year')}
						>
							Year {renderSortIndicator('year')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
							onClick={() => onSort('type')}
						>
							Type {renderSortIndicator('type')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
							onClick={() => onSort('status')}
						>
							Status {renderSortIndicator('status')}
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
					{vehicles?.map(vehicle => (
						<tr
							key={vehicle._id}
							className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
								{vehicle.make}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
								{vehicle.model}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
								{vehicle.year}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
								<VehicleTypeBadge type={vehicle.type} />
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
								<StatusBadge status={vehicle.status} />
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<button
									onClick={() => onVehicleSelect(vehicle)}
									className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
								>
									View Details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
