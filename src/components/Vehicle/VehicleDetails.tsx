import React, { useState } from 'react';
import type { MaintenanceFormData, Vehicle } from '../../types';
import { StatusBadge, VehicleTypeBadge } from '../Badge';
import { DetailRow } from '../Card';
import { AddMaintenanceForm } from './AddMaintenanceForm';
import { useCreateMaintenance } from '../../hooks';
import { Index } from '../Button';
import { t } from '../../utils/locale';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
	AreaChart,
	Area,
} from 'recharts';

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
					<p className="text-gray-600 mt-1 text-lg" data-testid="vehicle-year-plate">
						{vehicle.year}
						{vehicle.licensePlate && (
							<>
								{' '}
								• <span className="font-medium">{vehicle.licensePlate}</span>
							</>
						)}
					</p>
				</div>
				<Index variant="secondary" onClick={onBack} className="shadow-sm flex items-center">
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
					{t('BACK_TO_LIST')}
				</Index>
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
			{activeTab === 'analytics' && <AnalyticsTab />} {/*we are mocking the data in this tab*/}
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
		const newEntry = await mutateAsync(formData);
		console.log('Maintenance added :', newEntry);
		setShowForm(false);
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
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{t('MAINTENANCE_HISTORY')}</h3>
				<Index
					onClick={toggleShowForm}
					variant={showForm ? 'danger' : 'primary'}
					isLoading={loading}
				>
					{showForm ? t('CANCEL') : t('MAINTENANCE_ADD')}
				</Index>
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
					<p className="text-gray-600">{t('MAINTENANCE_NONE')}</p>
				)}
			</div>
		</div>
	);
};

// Location Tab
const LocationTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
	// Use the original embed if you want to keep the Tenderd office marker
	const originalEmbedUrl =
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115638.89114074553!2d54.98881503695701!3d25.077635277788172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d39dfcc406f%3A0xc2dd0ddf6fbc0db5!2sTenderd%20-%20AI%20Powered%20Fleet%20Management%20Platform!5e0!3m2!1sen!2s!4v1747986284897!5m2!1sen!2s';

	return (
		<div>
			<h3 className="text-lg font-semibold text-gray-900  mb-4">Current Location</h3>
			<div className="bg-gray-50  p-5 rounded-lg shadow-sm">
				<div className="flex items-center mb-4">
					<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-red-600 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
					<p className="text-gray-700 ">
						<span className="font-medium">Current Location:</span>{' '}
						<span className="text-gray-900 ">{vehicle?.location}</span>
					</p>
				</div>

				<div className="bg-gray-200  rounded-md overflow-hidden h-96">
					{/* Google Maps Embed iframe */}
					<iframe
						src={originalEmbedUrl}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen={true}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title={`Map showing location of ${vehicle.make} ${vehicle.model}`}
						className="w-full h-full"
					></iframe>
				</div>

				<div className="mt-6 border-t border-gray-200  pt-4">
					<h4 className="text-md font-medium text-gray-900  mb-3">Location History</h4>
					<ul className="space-y-2">
						{[
							{ location: 'Main Office', time: 'Current' },
							{ location: 'Main Office', time: 'Yesterday' },
							{ location: 'Field Site #3', time: '2 days ago' },
						].map((item, index) => (
							<li
								key={index}
								className="flex items-center text-sm text-gray-600  p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
							>
								<div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
								{item.location} - <span className="ml-1 text-gray-500 0">{item.time}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

// Analytics Tab
const AnalyticsTab = () => {
	const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');

	// Mock analytics data with a consistent structure for charts
	const dailyData = [
		{ name: 'Sun', hours: 10, fuel: 42 },
		{ name: 'Mon', hours: 12, fuel: 45 },
		{ name: 'Tue', hours: 8, fuel: 38 },
		{ name: 'Wed', hours: 15, fuel: 48 },
		{ name: 'Thu', hours: 9, fuel: 40 },
		{ name: 'Fri', hours: 11, fuel: 43 },
		{ name: 'Sat', hours: 7, fuel: 36 },
	];

	const monthlyData = [
		{ name: 'Jan', maintenance: 1200, hours: 160, efficiency: 8.2 },
		{ name: 'Feb', maintenance: 800, hours: 180, efficiency: 8.5 },
		{ name: 'Mar', maintenance: 1500, hours: 150, efficiency: 7.8 },
		{ name: 'Apr', maintenance: 600, hours: 190, efficiency: 8.7 },
	];

	const metrics = {
		avgDailyHours: 10.5,
		totalDistance: '12,500 km',
		fuelEfficiency: '8.5 km/L',
		costPerKm: '$0.85',
	};

	return (
		<div className="space-y-6">
			{/* Key Metrics Summary */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{Object.entries(metrics).map(([key, value]) => (
					<div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<p className="text-gray-600 text-sm capitalize">
							{key.replace(/([A-Z])/g, ' $1').trim()}
						</p>
						<p className="text-xl font-bold text-gray-900">{value}</p>
					</div>
				))}
			</div>

			{/* Combined Usage Chart with Toggle */}
			<div className="bg-gray-50 p-5 rounded-lg shadow-sm">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-base md:text-lg font-medium text-gray-900">
						{viewMode === 'daily' ? 'Daily Usage & Fuel Consumption' : 'Monthly Trends'}
					</h3>
					<div className="flex items-center space-x-2">
						<Index
							variant={viewMode === 'daily' ? 'primary' : 'secondary'}
							onClick={() => setViewMode('daily')}
						>
							Daily
						</Index>
						<Index
							variant={viewMode === 'monthly' ? 'primary' : 'secondary'}
							onClick={() => setViewMode('monthly')}
						>
							Monthly
						</Index>
					</div>
				</div>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						{viewMode === 'daily' ? (
							<BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis yAxisId="left" orientation="left" stroke="var(--color-primary)" />
								<YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
								<Tooltip />
								<Legend />
								<Bar yAxisId="left" dataKey="hours" name="Hours Used" fill="var(--color-primary)" />
								<Bar yAxisId="right" dataKey="fuel" name="Fuel (L)" fill="#82ca9d" />
							</BarChart>
						) : (
							<LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis yAxisId="left" orientation="left" stroke="var(--color-primary)" />
								<YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
								<Tooltip />
								<Legend />
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="maintenance"
									name="Maintenance Cost ($)"
									stroke="var(--color-primary)"
									activeDot={{ r: 8 }}
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="hours"
									name="Hours Used"
									stroke="#82ca9d"
									activeDot={{ r: 8 }}
								/>
							</LineChart>
						)}
					</ResponsiveContainer>
				</div>
			</div>

			{/* Efficiency Trend */}
			<div className="bg-gray-50 p-5 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
					Efficiency Trend
				</h3>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Area
								type="monotone"
								dataKey="efficiency"
								name="Fuel Efficiency (km/L)"
								stroke="var(--color-primary)"
								fill="var(--color-primary)"
								fillOpacity={0.3}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
