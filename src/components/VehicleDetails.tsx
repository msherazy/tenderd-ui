import React from 'react';
import type {Vehicle} from '../types';
import { StatusBadge, VehicleTypeBadge } from './Badges';
import { DetailRow } from './Card/Card.tsx';

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
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Header Section with more visual emphasis */}
            <div className="bg-gray-50 dark:bg-gray-750 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                            {vehicle.make} {vehicle.model}
                            <StatusBadge status={vehicle.status} className="ml-3" />
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-lg">
                            {vehicle.year} • <span className="font-medium">{vehicle.licensePlate}</span>
                        </p>
                    </div>
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm hover:shadow flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to List
                    </button>
                </div>
            </div>

            {/* Navigation Tabs with improved contrast */}
            <div className="bg-white dark:bg-gray-800 px-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8">
                    {['details', 'maintenance', 'location', 'analytics'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab
                                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Section with improved padding */}
            <div className="p-6">
                {activeTab === 'details' && <DetailsTab vehicle={vehicle} />}
                {activeTab === 'maintenance' && <MaintenanceTab vehicle={vehicle} />}
                {activeTab === 'location' && <LocationTab vehicle={vehicle} />}
                {activeTab === 'analytics' && <AnalyticsTab vehicle={vehicle} />}
            </div>
        </div>
    );
};

const DetailsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Basic Information
                </h3>
                <div className="space-y-5">
                    <DetailRow label="VIN" value={vehicle.vin} />
                    <DetailRow label="Fuel Type" value={vehicle.fuelType} />
                    <DetailRow 
                        label="Purchase Date" 
                        value={new Date(vehicle.createdAt).toLocaleDateString()}
                    />
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Specifications
                </h3>
                <div className="space-y-5">
                    <DetailRow label="Type" value={<VehicleTypeBadge type={vehicle.type} />} />
                    <DetailRow label="Status" value={<StatusBadge status={vehicle.status} />} />
                    <DetailRow 
                        label="Mileage" 
                        value={`${vehicle.mileage.toLocaleString()} miles`}
                    />
                    <DetailRow
                        label="Last Service"
                        value={new Date(vehicle.updatedAt).toLocaleDateString()}
                    />
                </div>
            </div>
        </div>
    );
};

const MaintenanceTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Maintenance History
            </h3>
            <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Last service performed on <span className="text-gray-900 dark:text-white">{new Date(vehicle.lastServiceDate).toLocaleDateString()}</span>
                    </p>
                </div>
                
                <div className="mt-5">
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
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recent Services</h4>
                    <ul className="space-y-3">
                        {[
                            { service: 'Oil change', date: '05/15/2023' },
                            { service: 'Tire rotation', date: '03/10/2023' },
                            { service: 'Brake inspection', date: '01/05/2023' }
                        ].map((item, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                {item.service} - <span className="ml-1 text-gray-500 dark:text-gray-400">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const LocationTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    // Use the original embed if you want to keep the Tenderd office marker
    const originalEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115638.89114074553!2d54.98881503695701!3d25.077635277788172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d39dfcc406f%3A0xc2dd0ddf6fbc0db5!2sTenderd%20-%20AI%20Powered%20Fleet%20Management%20Platform!5e0!3m2!1sen!2s!4v1747986284897!5m2!1sen!2s";

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Current Location
            </h3>
            <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Current Location:</span> <span className="text-gray-900 dark:text-white">{vehicle?.location}</span>
                    </p>
                </div>
                
                <div className="bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden h-96">
                    {/* Google Maps Embed iframe */}
                    <iframe 
                        src={originalEmbedUrl}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing location of ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full"
                        onError={(e) => {
                            // Add error handling if needed
                            console.error("Map failed to load");
                        }}
                    ></iframe>
                </div>
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Location History</h4>
                    <ul className="space-y-2">
                        {[
                            { location: 'Main Office', time: 'Current' },
                            { location: 'Main Office', time: 'Yesterday' },
                            { location: 'Field Site #3', time: '2 days ago' }
                        ].map((item, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                {item.location} - <span className="ml-1 text-gray-500 dark:text-gray-400">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const AnalyticsTab: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Usage Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Daily Usage (miles)
                    </h4>
                    <div className="h-64">
                        <div className="flex items-end h-48 space-x-1">
                            {vehicle?.dailyUsage?.map((miles, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                                        style={{ height: `${(miles / 150) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Weekly Usage (miles)
                    </h4>
                    <div className="h-64">
                        <div className="flex items-end h-48 space-x-4 justify-around">
                            {vehicle?.weeklyUsage?.map((miles, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className="w-8 bg-green-500 dark:bg-green-600 rounded-t hover:bg-green-600 dark:hover:bg-green-500 transition-colors"
                                        style={{ height: `${(miles / 800) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                        Week {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-gray-50 dark:bg-gray-750 p-5 rounded-lg shadow-sm">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Fuel Efficiency
                </h4>
                <div className="flex items-center flex-col md:flex-row">
                    <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current MPG</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">28.5</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 dark:bg-blue-600 h-2.5 rounded-full"
                                style={{ width: '72%' }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Industry average: 24.9 MPG</p>
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lifetime MPG</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">26.8</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-purple-500 dark:bg-purple-600 h-2.5 rounded-full"
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
