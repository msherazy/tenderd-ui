import React, { useState } from 'react';
import type { MaintenanceFormData, Vehicle } from '../types';
import { StatusBadge, VehicleTypeBadge } from './Badges';
import { DetailRow } from './Card/Card.tsx';
import { AddMaintenanceForm } from './AddMaintenanceForm';
import { useCreateMaintenance } from '../hooks';
import { Button } from './Button';

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
	<div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
		{/* Header */}
		<div className="bg-gray-50 p-6 border-b border-gray-200">
			<div className="flex justify-between items-start">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 flex items-center">
						{vehicle.make} {vehicle.model}
					</h2>
					<p className="text-gray-600 mt-1 text-lg">
						{vehicle.year}
						{vehicle.licensePlate && (
							<>
								{' '}
								• <span className="font-medium">{vehicle.licensePlate}</span>
							</>
						)}
					</p>
				</div>
				<Button
					variant="secondary"
					onClick={onBack}
					className="shadow-sm flex items-center"
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
					</Button>
			</div>
		</div>

		{/* Tabs */}
		<div className="bg-white px-6 border-b border-gray-200">
			<nav className="flex space-x-8">
				{['details', 'maintenance', 'location', 'analytics'].map(tab => (
					<button
						key={tab}
						onClick={() => onTabChange(tab)}
						className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
							activeTab === tab
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
			<div className="bg-gray-50 p-5 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
					Basic Information
				</h3>
				<div className="space-y-5">
					{vehicle.vin && <DetailRow label="VIN" value={vehicle.vin} />}
					{vehicle.fuelType && <DetailRow label="Fuel Type" value={vehicle.fuelType} />}
					<DetailRow label="Purchase Date" value={new Date(purchaseDate).toLocaleDateString()} />
				</div>
			</div>
			<div className="bg-gray-50 p-5 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
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
	const [formData, setFormData] = useState<MaintenanceFormData>({
		date: '',
		description: '',
		cost: 0,
		mileage: undefined,
		serviceCenter: '',
		notes: '',
		nextDueDate: undefined,
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const { mutateAsync, loading } = useCreateMaintenance(vehicle._id);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'number' ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const newEntry = await mutateAsync(formData);
			// Optionally append newEntry to vehicle.maintenanceHistory here
			setShowForm(false);
			setFormData({
				date: '',
				description: '',
				cost: 0,
				mileage: undefined,
				serviceCenter: '',
				notes: '',
				nextDueDate: undefined,
			});
		} catch (err) {
			// handle validation errors if provided
		}
	};

	const handleCancel = () => {
		setShowForm(false);
		setFormErrors({});
	};

	const toggleShowForm = () => {
		if (showForm) {
			handleCancel();
		} else {
			setShowForm(true);
		}
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900">
					Maintenance History
				</h3>
				<Button
					onClick={toggleShowForm}
					variant={showForm ? 'danger' : 'primary'}
					isLoading={loading}
				>
					{showForm ? 'Cancel' : 'Add Maintenance'}
				</Button>
			</div>

			{showForm && (
				<AddMaintenanceForm
					formData={formData}
					formErrors={formErrors}
					onFormChange={handleChange}
					onFormSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			)}

			<div className="bg-gray-50 p-5 rounded-lg shadow-sm mt-6">
				{vehicle.maintenanceHistory?.length ? (
					<ul className="space-y-3 max-h-64 overflow-y-auto">
						{vehicle.maintenanceHistory.map(entry => (
							<li key={entry._id} className="flex flex-col">
								<div className="flex justify-between text-sm text-gray-700">
									<span>{entry.description}</span>
									<span>{new Date(entry.date).toLocaleDateString()}</span>
								</div>
								<div className="text-xs text-gray-500">
									Cost: ${entry.cost.toFixed(2)} | Mileage:{' '}
									{entry.mileage?.toLocaleString() ?? 'N/A'}
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600">No maintenance records available.</p>
				)}
			</div>
		</div>
	);
};

// Location Tab
const LocationTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
	<div>
		<h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
		<div className="bg-gray-50 p-5 rounded-lg shadow-sm">
			{vehicle.location ? (
				<p className="text-gray-700">{vehicle.location}</p>
			) : (
				<p className="text-gray-600">No location data.</p>
			)}
		</div>
	</div>
);

// Analytics Tab
const AnalyticsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
	<div>
		<h3 className="text-lg font-semibold text-gray-900 mb-4">
			Analytics Unavailable: {vehicle.analyticsUnavailableReason}
		</h3>
		<p className="text-gray-600">No usage analytics data in API response.</p>
	</div>
);
