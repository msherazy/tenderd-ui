import { useEffect } from 'react';
import { useVehicleStore } from '../features/vehicleStore';

export default function VehicleListPage() {
    const { vehicles, fetchVehicles, loading, error } = useVehicleStore();

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Fleet Vehicles</h1>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 font-semibold transition">Add Vehicle</button>
                </div>
                {loading && (
                    <div className="text-center text-lg font-semibold text-blue-700 mt-16">Loading vehicles...</div>
                )}
                {error && (
                    <div className="text-red-600 text-center font-semibold mt-10">{error}</div>
                )}
                {!loading && !error && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {vehicles.map(vehicle => (
                            <div
                                key={vehicle._id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 flex flex-col gap-2 border border-gray-100 transition"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-lg font-bold text-gray-800">
                                        {vehicle.make} {vehicle.model}
                                        <span className="text-gray-400 font-normal ml-1">({vehicle.year})</span>
                                    </div>
                                    <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-1 text-xs font-semibold">
                    {vehicle.maintenanceHistory?.length || 0} Maint
                  </span>
                                </div>
                                <div className="text-xs text-gray-400 mb-1">VIN: {vehicle.vin}</div>
                                <div className="text-sm text-gray-700">
                                    Plate: <span className="font-mono">{vehicle.licensePlate}</span>
                                </div>
                                <div className="text-sm">
                                    Mileage: <span className="font-bold text-blue-700">{vehicle.mileage.toLocaleString()}</span> km
                                </div>
                                <div className="flex-grow"></div>
                                <button className="mt-4 text-blue-600 hover:underline text-sm font-medium self-start">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {!loading && !error && vehicles.length === 0 && (
                    <div className="text-gray-500 text-center font-semibold mt-10">No vehicles found.</div>
                )}
            </div>
        </div>
    );
}