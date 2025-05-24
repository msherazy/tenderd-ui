import React, { useState } from 'react';
import type { Vehicle } from '../types';
import { StatusBadge, VehicleTypeBadge } from './Badges';
import { DetailRow } from './Card/Card.tsx';
import { AddMaintenanceForm } from './AddMaintenanceForm';

interface VehicleDetailsProps {
	vehicle: Vehicle;
	activeTab: string;
	onTabChange: (tab: string) => void;
	onBack: () => void;
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = ({
	vehicle,
	activeTab,
	onTabChange,
	onBack,
}) => (
	<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
		{/* Header */}
		<div className="bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
			<div className="flex justify-between items-start">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
						{vehicle.make} {vehicle.model}
						{vehicle.status && <StatusBadge status={vehicle.status} className="ml-3" />}
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mt-1 text-lg">
						{vehicle.year}
						{vehicle.licensePlate && (
							<>
								{' '}
								• <span className="font-medium">{vehicle.licensePlate}</span>
							</>
						)}
					</p>
				</div>
				<button
					onClick={onBack}
					className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm flex items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 mr-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to List
				</button>
			</div>
		</div>

		{/* Tabs */}
		<div className="bg-white dark:bg-gray-800 px-6 border-b border-gray-200 dark:border-gray-700">
			<nav className="flex space-x-8">
				{['details', 'maintenance', 'location', 'analytics'].map(tab => (
					<button
						key={tab}
						onClick={() => onTabChange(tab)}
						className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
							activeTab === tab
								? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
								: 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
						}`}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</nav>
		</div>

		{/* Content */}
		<div className="p-6">
			{activeTab === 'details' && <DetailsTab vehicle={vehicle} />}
			{activeTab === 'maintenance' && <MaintenanceTab vehicle={vehicle} />}
			{activeTab === 'location' && <LocationTab vehicle={vehicle} />}
			{activeTab === 'analytics' && <AnalyticsTab vehicle={vehicle} />}
		</div>
	</div>
);

// Details Tab
const DetailsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
	const purchaseDate = vehicle.purchaseDate || vehicle.createdAt;
	const lastService = vehicle.lastServiceDate || vehicle.updatedAt;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
					Basic Information
				</h3>
				<div className="space-y-5">
					{vehicle.vin && <DetailRow label="VIN" value={vehicle.vin} />}
					{vehicle.fuelType && <DetailRow label="Fuel Type" value={vehicle.fuelType} />}
					<DetailRow label="Purchase Date" value={new Date(purchaseDate).toLocaleDateString()} />
				</div>
			</div>
			<div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
					Specifications
				</h3>
				<div className="space-y-5">
					{vehicle.type && (
						<DetailRow label="Type" value={<VehicleTypeBadge type={vehicle.type} />} />
					)}
					{vehicle.status && (
						<DetailRow label="Status" value={<StatusBadge status={vehicle.status} />} />
					)}
					<DetailRow label="Mileage" value={`${vehicle.mileage.toLocaleString()} miles`} />
					<DetailRow label="Last Service" value={new Date(lastService).toLocaleDateString()} />
				</div>
			</div>
		</div>
	);
};

// Maintenance Tab
const MaintenanceTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
	const [showForm, setShowForm] = useState(false);
	const handleAdd = () => setShowForm(true);
	const handleCancel = () => setShowForm(false);

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					Maintenance History
				</h3>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
				>
					Add Maintenance
				</button>
			</div>

			{showForm && (
				<AddMaintenanceForm
					formData={{
						date: '',
						description: '',
						cost: 0,
						mileage: undefined,
						serviceCenter: '',
						notes: '',
						nextDueDate: undefined,
					}}
					formErrors={{}}
					onFormChange={() => {}}
					onFormSubmit={() => {}}
					onCancel={handleCancel}
				/>
			)}

			<div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm mt-6">
				{vehicle.maintenanceHistory?.length ? (
					<ul className="space-y-3 max-h-64 overflow-y-auto">
						{vehicle.maintenanceHistory.map(entry => (
							<li key={entry._id} className="flex flex-col">
								<div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
									<span>{entry.description}</span>
									<span>{new Date(entry.date).toLocaleDateString()}</span>
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">
									Cost: ${entry.cost.toFixed(2)} | Mileage:{' '}
									{entry.mileage?.toLocaleString() ?? 'N/A'}
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600 dark:text-gray-400">No maintenance records available.</p>
				)}
			</div>
		</div>
	);
};

// Location Tab
const LocationTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
	<div>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Location</h3>
		<div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
			{vehicle.location ? (
				<p className="text-gray-700 dark:text-gray-300">{vehicle.location}</p>
			) : (
				<p className="text-gray-600 dark:text-gray-400">No location data.</p>
			)}
		</div>
	</div>
);

// Analytics Tab
const AnalyticsTab: React.FC<{ vehicle: Vehicle }> = () => (
	<div>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
			Analytics Unavailable
		</h3>
		<p className="text-gray-600 dark:text-gray-400">No usage analytics data in API response.</p>
	</div>
);
