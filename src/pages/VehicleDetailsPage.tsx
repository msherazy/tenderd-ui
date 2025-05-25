import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleDetails } from '../hooks';
import { VehicleDetails } from '../components/VehicleDetails';
import { LoadingSpinner, ErrorMessage } from '../components/Card/Card';

interface VehicleDetailsPageProps {
  setToast: (message: string | null) => void;
}

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({ setToast }) => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  // Use the existing hook to fetch vehicle details
  const { vehicle, loading, error } = useVehicleDetails(vehicleId || '');

  useEffect(() => {
    if (error) {
      setToast(error);
      // If there's an error fetching the vehicle, navigate back to the listing page
      navigate('/');
    }
  }, [error, navigate, setToast]);

  const handleBack = () => {
    navigate('/');
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
