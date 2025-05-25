import React from 'react';
import type { MaintenanceFormData } from '../types';
import { FormInput } from './FormComponents';

interface AddMaintenanceFormProps {
	formData: MaintenanceFormData;
	formErrors: Record<string, string>;
	onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFormSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

export const AddMaintenanceForm: React.FC<AddMaintenanceFormProps> = ({
	formData,
	formErrors,
	onFormChange,
	onFormSubmit,
	onCancel,
}) => {
	return (
		<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-100 dark:border-gray-700">
			<form onSubmit={onFormSubmit} className="dark:bg-gray-800">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Maintenance Details Section */}
					<div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
							Maintenance Details
						</h3>
						<FormInput
							label="Date"
							name="date"
							type="date"
							value={formData.date}
							onChange={onFormChange}
							error={formErrors.date}
							required
						/>
						<FormInput
							label="Description"
							name="description"
							type="text"
							value={formData.description}
							onChange={onFormChange}
							error={formErrors.description}
							required
						/>
						<FormInput
							label="Cost"
							name="cost"
							type="number"
							value={formData.cost.toString()}
							onChange={onFormChange}
							error={formErrors.cost}
							min="0"
							required
						/>
					</div>

					{/* Additional Information Section */}
					<div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
							Additional Information
						</h3>
						<FormInput
							label="Mileage"
							name="mileage"
							type="number"
							value={formData.mileage?.toString() || ''}
							onChange={onFormChange}
							error={formErrors.mileage}
							min="0"
						/>
						<FormInput
							label="Service Center"
							name="serviceCenter"
							type="text"
							value={formData.serviceCenter}
							onChange={onFormChange}
							error={formErrors.serviceCenter}
						/>
						<FormInput
							label="Notes"
							name="notes"
							type="text"
							value={formData.notes}
							onChange={onFormChange}
							error={formErrors.notes}
						/>
						<FormInput
							label="Next Due Date"
							name="nextDueDate"
							type="date"
							value={formData.nextDueDate || ''}
							onChange={onFormChange}
							error={formErrors.nextDueDate}
						/>
					</div>
				</div>

				<div className="mt-8">
					<button
						type="submit"
						className="w-full md:w-auto px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
					>
						Add Maintenance
					</button>
				</div>
			</form>
		</div>
	);
};
