import React from 'react';
import type {Vehicle} from '../types';
import { StatusBadge, VehicleTypeBadge } from './Badges';
import { DetailRow } from './Card';

interface VehicleDetailsProps {
    vehicle: Vehicle;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onBack: () => void;
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = ({
    vehicle,
    activeTab,
    onTabChange,
    onBack
}) => {
    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {vehicle.make} {vehicle.model}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {vehicle.year} • {vehicle.licensePlate}
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    Back to List
                </button>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => onTabChange('details')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => onTabChange('maintenance')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'maintenance'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        Maintenance
                    </button>
                    <button
                        onClick={() => onTabChange('location')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'location'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        Location
                    </button>
                    <button
                        onClick={() => onTabChange('analytics')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        Analytics
                    </button>
                </nav>
            </div>

            {activeTab === 'details' && <DetailsTab vehicle={vehicle} />}
            {activeTab === 'maintenance' && <MaintenanceTab vehicle={vehicle} />}
            {activeTab === 'location' && <LocationTab vehicle={vehicle} />}
            {activeTab === 'analytics' && <AnalyticsTab vehicle={vehicle} />}
        </div>
    );
};

const DetailsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="space-y-4">
                    <DetailRow label="VIN" value={vehicle.vin} />
                    <DetailRow label="Color" value={vehicle.color} />
                    <DetailRow label="Fuel Type" value={vehicle.fuelType} />
                    <DetailRow label="Purchase Date" value={new Date(vehicle.purchaseDate).toLocaleDateString()} />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Specifications</h3>
                <div className="space-y-4">
                    <DetailRow label="Type" value={<VehicleTypeBadge type={vehicle.type} />} />
                    <DetailRow label="Status" value={<StatusBadge status={vehicle.status} />} />
                    <DetailRow label="Mileage" value={`${vehicle.mileage.toLocaleString()} miles`} />
                    <DetailRow
                        label="Last Service"
                        value={new Date(vehicle.lastServiceDate).toLocaleDateString()}
                    />
                </div>
            </div>
        </div>
    );
};

const MaintenanceTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Maintenance History</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                    Last service performed on {new Date(vehicle.lastServiceDate).toLocaleDateString()}
                </p>
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Oil Change</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Due in 1,200 miles</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{ width: '75%' }}
                        ></div>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Recent Services</h4>
                    <ul className="space-y-2">
                        <li className="text-sm text-gray-600 dark:text-gray-300">• Oil change - 05/15/2023</li>
                        <li className="text-sm text-gray-600 dark:text-gray-300">• Tire rotation - 03/10/2023</li>
                        <li className="text-sm text-gray-600 dark:text-gray-300">• Brake inspection - 01/05/2023</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const LocationTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Location</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-medium">Location:</span> {vehicle.location}
                </p>
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-md flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Map view would be displayed here</p>
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Location History</h4>
                    <ul className="space-y-2">
                        <li className="text-sm text-gray-600 dark:text-gray-300">• {vehicle.location} - Current</li>
                        <li className="text-sm text-gray-600 dark:text-gray-300">• Main Office - Yesterday</li>
                        <li className="text-sm text-gray-600 dark:text-gray-300">• Field Site #3 - 2 days ago</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const AnalyticsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Usage Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Daily Usage (miles)</h4>
                    <div className="h-64">
                        <div className="flex items-end h-48 space-x-1">
                            {vehicle.dailyUsage.map((miles, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors"
                                        style={{ height: `${(miles / 150) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Weekly Usage (miles)</h4>
                    <div className="h-64">
                        <div className="flex items-end h-48 space-x-4">
                            {vehicle.weeklyUsage.map((miles, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className="w-8 bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                                        style={{ height: `${(miles / 800) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Week {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Fuel Efficiency</h4>
                <div className="flex items-center">
                    <div className="w-1/2 pr-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current MPG</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">28.5</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: '72%' }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Industry average: 24.9 MPG</p>
                    </div>
                    <div className="w-1/2 pl-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lifetime MPG</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">26.8</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-purple-500 h-2.5 rounded-full"
                                style={{ width: '68%' }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 30 MPG</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
