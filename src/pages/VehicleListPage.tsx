import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useVehicleStore } from '../features/vehicleStore';
import { FormSelect, SearchInput } from '../components/Form';
import { useCreateVehicle, useVehicles } from '../hooks';
import { VehicleList } from '../components/Vehicle/VehicleList';
import { AddVehicleForm } from '../components/Vehicle/AddVehicleForm';
import { Index } from '../components/Button';
import type { Vehicle } from '../types';

interface VehicleListPageProps {
	setToast: (message: string | null) => void;
}

const VehicleListPage: React.FC<VehicleListPageProps> = ({ setToast }) => {
	const { vehicles, loading, error, setVehicles } = useVehicles();
	const createVehicle = useCreateVehicle();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) setToast(error);
	}, [error, setToast]);

	useEffect(() => {
		if (createVehicle.error) setToast(createVehicle.error);
	}, [createVehicle.error, setToast]);

	const {
		showAddForm,
		formData,
		formErrors,
		searchTerm,
		filterType,
		filterStatus,
		sortField,
		sortDirection,

		toggleAddForm,
		updateFormData,
		setSearchTerm,
		setFilterType,
		setFilterStatus,
		setSortField,
	} = useVehicleStore();

	const handleVehicleSelect = (vehicle: Vehicle) => {
		if (vehicle && vehicle._id) {
			navigate({ to: '/Vehicle/$vehicleId', params: { vehicleId: vehicle._id } });
		}
	};

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		updateFormData(name, name === 'year' || name === 'mileage' ? parseInt(value) || 0 : value);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const isValid = useVehicleStore.getState().validateForm();
		if (!isValid) return;

		try {
			const { formData } = useVehicleStore.getState();
			const response = await createVehicle.mutateAsync(formData);
			const newVehicle = response.data;

			// Update both the Zustand store and the local state
			useVehicleStore.setState(state => ({
				vehicles: [...state.vehicles, newVehicle],
				showAddForm: false,
			}));

			// Update the local state from useVehicles hook
			setVehicles(currentVehicles => [...currentVehicles, newVehicle]);

			useVehicleStore.getState().resetFormData();
		} catch (error) {
			console.error('Failed to create vehicle:', error);
			setToast((error as Error).message);
		}
	};

	// Filter and sort Vehicle based on current filters and sort settings
	const filteredVehicles = vehicles.filter(vehicle => {
		const matchesSearch =
			vehicle?.make?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			vehicle?.model?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			vehicle?.licensePlate?.toLowerCase().includes(searchTerm?.toLowerCase());

		const matchesType = filterType === 'all' || vehicle.type === filterType;
		const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;

		return matchesSearch && matchesType && matchesStatus;
	});

	const sortedVehicles = [...filteredVehicles].sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];

		if (aValue === null || aValue === undefined || bValue === null || bValue === undefined) {
			return 0;
		}
		if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
		if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	return (
		<>
			{!showAddForm && (
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
								<Index
									type="submit"
									variant="primary"
									onClick={() => {
										setFilterType('all');
										setFilterStatus('all');
										setSearchTerm('');
									}}
								>
									Clear
								</Index>
							)}
							<FormSelect
								label="Filter by Type"
								name="filterType"
								value={filterType}
								onChange={e => setFilterType(e.target.value)}
								options={[
									{ value: 'all', label: 'Vehicle Types' },
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
									{ value: 'all', label: 'Statuses' },
									{ value: 'Active', label: 'Active' },
									{ value: 'Maintenance', label: 'Maintenance' },
									{ value: 'Inactive', label: 'Inactive' },
								]}
								noLabel
							/>
							<Index variant="primary" fullWidth onClick={() => toggleAddForm(true)}>
								Add Vehicle
							</Index>
						</div>
					</div>
					<VehicleList
						vehicles={sortedVehicles}
						loading={loading}
						error={error}
						sortField={sortField}
						sortDirection={sortDirection}
						onVehicleSelect={handleVehicleSelect}
						onSort={setSortField}
					/>
				</div>
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
	);
};

export default VehicleListPage;
