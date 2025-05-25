import React from 'react';
import type { VehicleFormData } from '../../types';
import { FormInput, FormSelect } from '../Form';
import { Index } from '../Button';

interface AddVehicleFormProps {
	formData: VehicleFormData;
	formErrors: Record<string, string>;
	onFormChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	onFormSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({
	formData,
	formErrors,
	onFormChange,
	onFormSubmit,
	onCancel,
}) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100">
			<div className="flex justify-between items-start mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Add New Vehicle</h2>
				<Index onClick={onCancel} variant={'danger'}>
					Cancel
				</Index>
			</div>

			<form onSubmit={onFormSubmit} role="form">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
							Vehicle Details
						</h3>
						<FormInput
							label="Make"
							name="make"
							value={formData.make}
							onChange={onFormChange}
							error={formErrors.make}
							required
						/>
						<FormInput
							label="Model"
							name="model"
							value={formData.model}
							onChange={onFormChange}
							error={formErrors.model}
							required
						/>
						<FormInput
							label="Year"
							name="year"
							type="number"
							value={formData.year.toString()}
							onChange={onFormChange}
							error={formErrors.year}
							min="2000"
							max={(new Date().getFullYear() + 1).toString()}
							required
						/>
						<FormSelect
							label="Type"
							name="type"
							value={formData.type}
							onChange={onFormChange}
							options={[
								{ value: 'Sedan', label: 'Sedan' },
								{ value: 'SUV', label: 'SUV' },
								{ value: 'Truck', label: 'Truck' },
								{ value: 'Van', label: 'Van' },
								{ value: 'Electric', label: 'Electric' },
							]}
							required={true}
						/>
						<FormInput label="Color" name="color" value={formData.color} onChange={onFormChange} />
					</div>
					<div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
							Additional Information
						</h3>
						<FormInput
							label="License Plate"
							name="licensePlate"
							value={formData.licensePlate}
							onChange={onFormChange}
							error={formErrors.licensePlate}
							required
						/>
						<FormInput
							label="VIN"
							name="vin"
							value={formData.vin}
							onChange={onFormChange}
							error={formErrors.vin}
							required
						/>
						<FormInput
							label="Mileage"
							name="mileage"
							type="number"
							value={formData.mileage.toString()}
							onChange={onFormChange}
							error={formErrors.mileage}
							min="0"
						/>
						<FormSelect
							label="Status"
							name="status"
							value={formData.status}
							onChange={onFormChange}
							options={[
								{ value: 'Active', label: 'Active' },
								{ value: 'Maintenance', label: 'Maintenance' },
								{ value: 'Inactive', label: 'Inactive' },
							]}
							required={true}
						/>
						<FormSelect
							label="Fuel Type"
							name="fuelType"
							value={formData.fuelType}
							onChange={onFormChange}
							options={[
								{ value: 'Gasoline', label: 'Gasoline' },
								{ value: 'Diesel', label: 'Diesel' },
								{ value: 'Electric', label: 'Electric' },
								{ value: 'Hybrid', label: 'Hybrid' },
							]}
						/>
					</div>
				</div>
				<div className="mt-8">
					<Index type="submit" variant="primary">
						Add Vehicle
					</Index>
				</div>
			</form>
		</div>
	);
};
