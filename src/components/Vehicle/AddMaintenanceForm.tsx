import React, { useState, useEffect } from 'react';
import type { MaintenanceFormData } from '../../types';
import { FormInput } from '../Form';
import { Index } from '../Button';
import { t } from '../../utils/locale';

interface AddMaintenanceFormProps {
	formData: MaintenanceFormData;
	formErrors: Record<string, string>;
	onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFormSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

export const AddMaintenanceForm: React.FC<AddMaintenanceFormProps> = ({
	formData,
	formErrors: initialFormErrors,
	onFormChange,
	onFormSubmit,
}) => {
	// Local state for form errors so we can track them internally before submission
	const [formErrors, setFormErrors] = useState<Record<string, string>>(initialFormErrors);

	// Function to update parent's form errors and  local errors
	const updateFormErrors = (field: string, message: string) => {
		setFormErrors(prev => ({
			...prev,
			[field]: message,
		}));

		const simulatedEvent = {
			target: {
				name: field,
				value: formData[field as keyof MaintenanceFormData] || '',
			},
		} as React.ChangeEvent<HTMLInputElement>;
		onFormChange(simulatedEvent);
	};

	// Update local errors when initialFormErrors changes
	useEffect(() => {
		setFormErrors(initialFormErrors);
	}, [initialFormErrors]);

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};
		const today = new Date();

		// Required field validations
		if (!formData.date) {
			errors.date = 'Date is required';
		} else if (new Date(formData.date) > today) {
			errors.date = 'Date cannot be in the future';
		}

		if (!formData.description?.trim()) {
			errors.description = 'Description is required';
		}

		// Cost validation
		if (formData.cost === undefined || formData.cost === null) {
			errors.cost = 'Cost is required';
		} else if (formData.cost < 0) {
			errors.cost = 'Cost cannot be negative';
		} else if (formData.cost === 0) {
			errors.cost = 'Are you sure the cost is zero?';
		} else if (formData.cost > 10000) {
			errors.cost = 'Cost seems unusually high. Please verify.';
		}

		// Mileage validation
		if (formData.mileage === undefined || formData.mileage === null) {
			errors.mileage = 'Mileage is required';
		} else if (formData.mileage < 0) {
			errors.mileage = 'Mileage cannot be negative';
		} else if (formData.mileage > 1000000) {
			errors.mileage = 'Mileage seems unusually high. Please verify.';
		}

		// Next due date validation
		if (!formData.nextDueDate) {
			errors.nextDueDate = 'Next due date is required';
		} else {
			const nextDueDate = new Date(formData.nextDueDate);
			const maintenanceDate = formData.date ? new Date(formData.date) : today;

			if (nextDueDate <= maintenanceDate) {
				errors.nextDueDate = 'Next due date must be after the maintenance date';
			} else {
				const twoYearsFromNow = new Date();
				twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);

				if (nextDueDate > twoYearsFromNow) {
					errors.nextDueDate = 'Next due date is very far in the future. Please verify.';
				}
			}
		}

		const hasErrors = Object.keys(errors).length > 0;
		if (hasErrors) {
			Object.entries(errors).forEach(([field, message]) => {
				updateFormErrors(field, message);
			});
		} else {
			Object.keys(formErrors).forEach(field => {
				updateFormErrors(field, '');
			});
		}

		return !hasErrors;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onFormSubmit(e);
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 custom-card-style">
			<form onSubmit={handleSubmit} role="form">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Maintenance Details Section */}
					<div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium text-dark mb-4 border-b border-gray-200 pb-2">
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
							data-testid="maintenance-date-input"
						/>
						<FormInput
							label="Description"
							name="description"
							type="text"
							value={formData.description}
							onChange={onFormChange}
							error={formErrors.description}
							required
							data-testid="maintenance-description-input"
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
							data-testid="maintenance-cost-input"
						/>
					</div>

					{/* Additional Information Section */}
					<div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
						<h3 className="text-lg font-medium mb-4 border-b border-gray-200 pb-2">
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
							required
							data-testid="maintenance-mileage-input"
						/>
						<FormInput
							label="Service Center"
							name="serviceCenter"
							type="text"
							value={formData.serviceCenter}
							onChange={onFormChange}
							error={formErrors.serviceCenter}
							data-testid="maintenance-service-center-input"
						/>
						<FormInput
							label="Notes"
							name="notes"
							type="text"
							value={formData.notes}
							onChange={onFormChange}
							error={formErrors.notes}
							data-testid="maintenance-notes-input"
						/>
						<FormInput
							label="Next Due Date"
							name="nextDueDate"
							type="date"
							value={formData.nextDueDate || ''}
							onChange={onFormChange}
							error={formErrors.nextDueDate}
							required
							data-testid="maintenance-next-due-date-input"
						/>
					</div>
				</div>

				<div className="mt-8 flex justify-end space-x-3">
					<Index type="submit" variant="primary">
						{t('SUBMIT')}
					</Index>
				</div>
			</form>
		</div>
	);
};
