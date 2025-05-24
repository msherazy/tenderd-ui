import { useEffect } from 'react';
import { useVehicleStore } from '../features/vehicleStore';
import { Button } from '../components/Button';

export default function VehicleListPage() {
	const { vehicles, fetchVehicles, loading, error } = useVehicleStore();

	useEffect(() => {
		fetchVehicles();
	}, [fetchVehicles]);

	if (loading) return <div className="p-8">Loading vehicles...</div>;
	if (error) return <div className="text-red-600">{error}</div>;
	if (vehicles.length === 0) return <div>No vehicles found.</div>;

	return (
		<div className="p-8 min-h-screen bg-gray-100">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-extrabold text-gray-900">Fleet Vehicles</h1>
				<Button>Add Vehicle</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
				{vehicles.map(vehicle => (
					<div
						key={vehicle._id}
						className="rounded-lg shadow-md bg-white p-6 flex flex-col gap-2 transition hover:shadow-lg"
					>
						<div className="font-bold text-lg mb-1 text-gray-900">
							{vehicle.make} {vehicle.model}
							<span className="text-gray-400 font-normal">({vehicle.year})</span>
						</div>
						<div className="text-xs text-gray-500 mb-2">VIN: {vehicle.vin}</div>
						<div>
							Plate: <span className="font-mono text-gray-700">{vehicle.licensePlate}</span>
						</div>
						<div>
							Mileage:{' '}
							<span className="font-semibold text-blue-700">
								{vehicle.mileage.toLocaleString()}
							</span>{' '}
							km
						</div>
						<div className="mt-2">
							<span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
								Maintenance Records: {vehicle?.maintenanceHistory?.length || 0}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
