import './index.css';
import { useState, useEffect } from 'react';
import { useVehicleStore } from './features/vehicleStore';
import { FormSelect, SearchInput } from './components/FormComponents';
import { useVehicles } from './hooks';
import { VehicleDetails } from './components/VehicleDetails';
import { AddVehicleForm } from './components/AddVehicleForm';
import { useCreateVehicle } from './hooks';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VehicleList } from './components/VehicleList.tsx';
import { Toast } from './components/Toast';

const App = () => {
	const { vehicles, loading, error } = useVehicles();
	const createVehicle = useCreateVehicle();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		// Check for the user's preferred color scheme or saved preference
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			setIsDarkMode(true);
			document.documentElement.classList.add('dark');
		} else {
			setIsDarkMode(false);
			document.documentElement.classList.remove('dark');
		}
	}, []);

	useEffect(() => {
		if (error) setToast(error);
	}, [error]);

	useEffect(() => {
		if (createVehicle.error) setToast(createVehicle.error);
	}, [createVehicle.error]);

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);

		if (newDarkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	// Get state and actions from our store
	const {
		selectedVehicle,
		activeTab,
		showAddForm,
		formData,
		formErrors,
		searchTerm,
		filterType,
		filterStatus,
		sortField,
		sortDirection,

		selectVehicle,
		setActiveTab,
		clearSelectedVehicle,
		toggleAddForm,
		updateFormData,
		setSearchTerm,
		setFilterType,
		setFilterStatus,
		setSortField,
	} = useVehicleStore();

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		updateFormData(name, name === 'year' || name === 'mileage' ? parseInt(value) || 0 : value);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const isValid = useVehicleStore.getState().validateForm();
		if (!isValid) return;

		try {
			const { formData } = useVehicleStore.getState();
			const newVehicle = await createVehicle.mutateAsync(formData);
			useVehicleStore.setState(state => ({
				vehicles: [...state.vehicles, newVehicle],
				showAddForm: false,
			}));
			useVehicleStore.getState().resetFormData();
		} catch (error) {
			console.error('Failed to create vehicle:', error);
			useVehicleStore.setState({ error: (error as Error).message });
		}
	};

	// Filter and sort vehicles based on current filters and sort settings
	const filteredVehicles = vehicles.filter(vehicle => {
		const matchesSearch =
			vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filterType === 'all' || vehicle.type === filterType;
		const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;

		return matchesSearch && matchesType && matchesStatus;
	});

	const sortedVehicles = [...filteredVehicles].sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];

		if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
		if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	return (
		<div className="flex flex-col min-h-screen">
			<Header onThemeToggle={toggleDarkMode} isDarkMode={isDarkMode} />
			<main className={`flex-grow ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
				<div className="max-w-[1440px] mx-auto px-4 py-8">
					<>
						{toast && <Toast message={toast} onClose={() => setToast(null)} />}
						{!selectedVehicle && !showAddForm && (
							<div className="mb-8">
								<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
									<div className="w-full md:w-auto">
										<SearchInput
											value={searchTerm}
											onChange={e => setSearchTerm(e.target.value)}
											placeholder="Search vehicles..."
										/>
									</div>
									<div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center sm:items-end">
										{(filterType !== 'all' || filterStatus !== 'all' || searchTerm) && (
											<button
												onClick={() => {
													setFilterType('all');
													setFilterStatus('all');
													setSearchTerm('');
												}}
												className="w-full text-sm text-indigo-600 hover:underline mt-2 sm:mt-0"
											>
												Clear
											</button>
										)}
										<FormSelect
											label="Filter by Type"
											name="filterType"
											value={filterType}
											onChange={e => setFilterType(e.target.value)}
											options={[
												{ value: 'all', label: 'All Types' },
												{ value: 'Sedan', label: 'Sedan' },
												{ value: 'SUV', label: 'SUV' },
												{ value: 'Truck', label: 'Truck' },
												{ value: 'Van', label: 'Van' },
												{ value: 'Electric', label: 'Electric' },
											]}
											noLabel
										/>
										<FormSelect
											label="Filter by Status"
											name="filterStatus"
											value={filterStatus}
											onChange={e => setFilterStatus(e.target.value)}
											options={[
												{ value: 'all', label: 'All Statuses' },
												{ value: 'Active', label: 'Active' },
												{ value: 'Maintenance', label: 'Maintenance' },
												{ value: 'Inactive', label: 'Inactive' },
											]}
											noLabel
										/>
										<button
											onClick={() => toggleAddForm(true)}
											className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
										>
											Add Vehicle
										</button>
									</div>
								</div>
								<VehicleList
									vehicles={sortedVehicles}
									loading={loading}
									error={error}
									sortField={sortField}
									sortDirection={sortDirection}
									onVehicleSelect={selectVehicle}
									onSort={setSortField}
								/>
							</div>
						)}

						{selectedVehicle && (
							<VehicleDetails
								vehicle={selectedVehicle}
								activeTab={activeTab}
								onTabChange={setActiveTab}
								onBack={clearSelectedVehicle}
							/>
						)}

						{showAddForm && (
							<AddVehicleForm
								formData={formData}
								formErrors={formErrors}
								onFormChange={handleFormChange}
								onFormSubmit={handleFormSubmit}
								onCancel={() => toggleAddForm(false)}
							/>
						)}
					</>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default App;
