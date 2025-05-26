import React from 'react';
import { useVehicleStore } from '../../features/vehicleStore';
import { Button } from '../Button/Button';
import { t } from '../../utils/locale';

export const LoadingSpinner = () => {
	return (
		<div className="flex justify-center items-center py-12">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
		</div>
	);
};

export const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm text-red-700">{message}</p>
				</div>
			</div>
		</div>
	);
};

export const EmptyState = () => {
	const { toggleAddForm } = useVehicleStore();
	return (
		<div className="text-center py-12" data-testid="empty-state">
			<svg
				className="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vectorEffect="non-scaling-stroke"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h3 className="mt-2 text-sm font-medium text-gray-900">{t('VEHICLE_NONE_FOUND')}</h3>
			<p className="mt-1 text-sm text-gray-500">{t('VEHICLE_SEARCH_ADJUST')}</p>
			<div className="mt-6">
				<Button
					variant="primary"
					onClick={() => toggleAddForm(true)}
					type="button"
					className="inline-flex items-center"
				>
					<svg
						className="-ml-1 mr-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					{t('VEHICLE_ADD')}
				</Button>
			</div>
		</div>
	);
};

export const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<dt className="text-sm font-medium text-gray-500">{label}</dt>
			<dd className="col-span-2 text-sm text-gray-900">{value}</dd>
		</div>
	);
};
