import React from 'react';
import type {VehicleFormData} from '../types';
import { FormInput, FormSelect } from './FormComponents';

interface AddVehicleFormProps {
    formData: VehicleFormData;
    formErrors: Record<string, string>;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFormSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({
    formData,
    formErrors,
    onFormChange,
    onFormSubmit,
    onCancel
}) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Vehicle</h2>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={onFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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
                            maxLength={4}
                            pattern="\\d{1,4}"
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
                        <FormInput
                            label="Color"
                            name="color"
                            value={formData.color}
                            onChange={onFormChange}
                            pattern="[A-Za-z ]*"
                        />
                    </div>
                    <div className="space-y-4">
                        <FormInput
                            label="License Plate"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={onFormChange}
                            error={formErrors.licensePlate}
                            required
                            pattern="[A-Za-z0-9 ]*"
                        />
                        <FormInput
                            label="VIN"
                            name="vin"
                            value={formData.vin}
                            onChange={onFormChange}
                            error={formErrors.vin}
                            maxLength={17}
                            minLength={17}
                            required
                            pattern="\\d{17}"
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
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
};
