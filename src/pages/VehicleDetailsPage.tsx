import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useVehicleDetails } from '../hooks';
import { VehicleDetails } from '../components/Vehicle/VehicleDetails';
import { ErrorMessage, LoadingSpinner } from '../components/Card';
import { vehicleDetailsRoute } from '../router';

interface VehicleDetailsPageProps {
	setToast: (message: string | null) => void;
}

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({ setToast }) => {
	const { vehicleId } = useParams({ from: vehicleDetailsRoute.id });
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('details');
	const { vehicle, loading, error } = useVehicleDetails(vehicleId || '');

	useEffect(() => {
		if (error) {
			setToast(error);
			navigate({ to: '/' });
		}
	}, [error, navigate, setToast]);

	const handleBack = () => {
		navigate({ to: '/' });
	};

	if (loading) return <LoadingSpinner />;
	if (error || !vehicle) return <ErrorMessage message={error || 'Vehicle not found'} />;

	return (
		<VehicleDetails
			vehicle={vehicle}
			activeTab={activeTab}
			onTabChange={setActiveTab}
			onBack={handleBack}
		/>
	);
};

export default VehicleDetailsPage;
