import React from 'react';
import type { Vehicle } from '../../types';
import { StatusBadge, VehicleTypeBadge } from '../Badge';
import { EmptyState, ErrorMessage, LoadingSpinner } from '../Card';
import { Index } from '../Button';
import { t } from '../../utils/locale';

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
			<table className="min-w-full bg-white divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
							onClick={() => onSort('make')}
						>
							Make {renderSortIndicator('make')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
							onClick={() => onSort('model')}
						>
							Model {renderSortIndicator('model')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
							onClick={() => onSort('year')}
						>
							Year {renderSortIndicator('year')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
							onClick={() => onSort('type')}
						>
							Type {renderSortIndicator('type')}
						</th>
						<th
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
							onClick={() => onSort('status')}
						>
							Status {renderSortIndicator('status')}
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{vehicles?.map(vehicle => (
						<tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{vehicle.make}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.model}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.year}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<VehicleTypeBadge type={vehicle.type} />
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<StatusBadge status={vehicle.status} />
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<Index variant="primary" onClick={() => onVehicleSelect(vehicle)}>
									{t('VIEW_DETAILS')}
								</Index>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
