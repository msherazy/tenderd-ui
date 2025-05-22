import './index.css';
import { useState, useEffect } from 'react';
type Vehicle = {
    id: string;
    make: string;
    model: string;
    year: number;
    type: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Electric';
    status: 'Active' | 'Maintenance' | 'Inactive';
    licensePlate: string;
    mileage: number;
    lastServiceDate: string;
    color: string;
    fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
    location: string;
    vin: string;
    purchaseDate: string;
    dailyUsage: number[];
    weeklyUsage: number[];
};

type VehicleFormData = Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>;

const mockVehicles: Vehicle[] = [
    {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        type: 'Sedan',
        status: 'Active',
        licensePlate: 'ABC123',
        mileage: 12500,
        lastServiceDate: '2023-05-15',
        color: 'Silver',
        fuelType: 'Gasoline',
        location: 'Downtown Garage',
        vin: '1HGCM82633A123456',
        purchaseDate: '2022-01-10',
        dailyUsage: [50, 45, 60, 55, 70, 0, 0],
        weeklyUsage: [320, 280, 350, 300],
    },
    {
        id: '2',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        type: 'Electric',
        status: 'Active',
        licensePlate: 'DEF456',
        mileage: 8000,
        lastServiceDate: '2023-06-20',
        color: 'Red',
        fuelType: 'Electric',
        location: 'Main Office',
        vin: '5YJ3E1EA0PF123456',
        purchaseDate: '2023-02-15',
        dailyUsage: [120, 110, 130, 115, 125, 90, 0],
        weeklyUsage: [690, 720, 680, 700],
    },
    {
        id: '3',
        make: 'Ford',
        model: 'F-150',
        year: 2021,
        type: 'Truck',
        status: 'Maintenance',
        licensePlate: 'GHI789',
        mileage: 35000,
        lastServiceDate: '2023-04-10',
        color: 'Black',
        fuelType: 'Diesel',
        location: 'Service Center',
        vin: '1FTFW1E53MFA12345',
        purchaseDate: '2021-08-22',
        dailyUsage: [80, 75, 90, 0, 0, 0, 0],
        weeklyUsage: [245, 260, 280, 0],
    },
    {
        id: '4',
        make: 'Honda',
        model: 'Odyssey',
        year: 2020,
        type: 'Van',
        status: 'Inactive',
        licensePlate: 'JKL012',
        mileage: 42000,
        lastServiceDate: '2023-01-30',
        color: 'Blue',
        fuelType: 'Gasoline',
        location: 'Storage Facility',
        vin: '5FNRL5H97LB123456',
        purchaseDate: '2020-05-18',
        dailyUsage: [0, 0, 0, 0, 0, 0, 0],
        weeklyUsage: [0, 0, 0, 0],
    },
    {
        id: '5',
        make: 'Subaru',
        model: 'Outback',
        year: 2023,
        type: 'SUV',
        status: 'Active',
        licensePlate: 'MNO345',
        mileage: 9500,
        lastServiceDate: '2023-07-05',
        color: 'Green',
        fuelType: 'Hybrid',
        location: 'Field Office',
        vin: '4S4BSANC3P3234567',
        purchaseDate: '2023-03-12',
        dailyUsage: [65, 70, 60, 75, 80, 40, 0],
        weeklyUsage: [390, 410, 380, 420],
    },
];

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [activeTab, setActiveTab] = useState('details');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<VehicleFormData>({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        type: 'Sedan',
        status: 'Active',
        licensePlate: '',
        mileage: 0,
        lastServiceDate: new Date().toISOString().split('T')[0],
        color: '',
        fuelType: 'Gasoline',
        location: '',
        vin: '',
        purchaseDate: new Date().toISOString().split('T')[0],
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [sortField, setSortField] = useState<keyof Vehicle>('make');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    useEffect(() => {
        // Simulate API fetch
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setVehicles(mockVehicles);
                setLoading(false);
            } catch {
                setError('Failed to load vehicles. Please try again later.');
                setLoading(false);
            }
        };

        fetchVehicles();

        // Check for dark mode preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleVehicleSelect = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setActiveTab('details');
        // // Update URL without page reload
        // router.push(`/?vehicle=${vehicle.id}`, undefined, { shallow: true });
    };

    const handleBackToList = () => {
        setSelectedVehicle(null);
        // router.push('/', undefined, { shallow: true });
    };

    const handleAddVehicle = () => {
        setShowAddForm(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' || name === 'mileage' ? parseInt(value) || 0 : value,
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.make.trim()) errors.make = 'Make is required';
        if (!formData.model.trim()) errors.model = 'Model is required';
        if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
            errors.year = 'Invalid year';
        }
        if (!formData.licensePlate.trim()) errors.licensePlate = 'License plate is required';
        if (formData.mileage < 0) errors.mileage = 'Mileage must be positive';
        if (!formData.vin.trim()) errors.vin = 'VIN is required';
        if (!formData.purchaseDate) errors.purchaseDate = 'Purchase date is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const newVehicle: Vehicle = {
            ...formData,
            id: Math.random().toString(36).substring(2, 9),
            dailyUsage: [],
            weeklyUsage: [],
        };

        setVehicles(prev => [...prev, newVehicle]);
        setShowAddForm(false);
        setFormData({
            make: '',
            model: '',
            year: new Date().getFullYear(),
            type: 'Sedan',
            status: 'Active',
            licensePlate: '',
            mileage: 0,
            lastServiceDate: new Date().toISOString().split('T')[0],
            color: '',
            fuelType: 'Gasoline',
            location: '',
            vin: '',
            purchaseDate: new Date().toISOString().split('T')[0],
        });
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch =
            vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || vehicle.type === filterType;
        const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    const sortedVehicles = [...filteredVehicles].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field: keyof Vehicle) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const renderSortIndicator = (field: keyof Vehicle) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const renderVehicleList = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage message={error} />;
        if (sortedVehicles.length === 0) return <EmptyState />;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('make')}
                        >
                            Make {renderSortIndicator('make')}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('model')}
                        >
                            Model {renderSortIndicator('model')}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('year')}
                        >
                            Year {renderSortIndicator('year')}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('type')}
                        >
                            Type {renderSortIndicator('type')}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('status')}
                        >
                            Status {renderSortIndicator('status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedVehicles.map(vehicle => (
                        <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {vehicle.make}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {vehicle.model}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {vehicle.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <VehicleTypeBadge type={vehicle.type} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <StatusBadge status={vehicle.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleVehicleSelect(vehicle)}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderVehicleDetails = () => {
        if (!selectedVehicle) return null;

        return (
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedVehicle.make} {selectedVehicle.model}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {selectedVehicle.year} • {selectedVehicle.licensePlate}
                        </p>
                    </div>
                    <button
                        onClick={handleBackToList}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Back to List
                    </button>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'maintenance'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                        >
                            Maintenance
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'location'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                        >
                            Location
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                        >
                            Analytics
                        </button>
                    </nav>
                </div>

                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                            <div className="space-y-4">
                                <DetailRow label="VIN" value={selectedVehicle.vin} />
                                <DetailRow label="Color" value={selectedVehicle.color} />
                                <DetailRow label="Fuel Type" value={selectedVehicle.fuelType} />
                                <DetailRow label="Purchase Date" value={new Date(selectedVehicle.purchaseDate).toLocaleDateString()} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Specifications</h3>
                            <div className="space-y-4">
                                <DetailRow label="Type" value={<VehicleTypeBadge type={selectedVehicle.type} />} />
                                <DetailRow label="Status" value={<StatusBadge status={selectedVehicle.status} />} />
                                <DetailRow label="Mileage" value={`${selectedVehicle.mileage.toLocaleString()} miles`} />
                                <DetailRow
                                    label="Last Service"
                                    value={new Date(selectedVehicle.lastServiceDate).toLocaleDateString()}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'maintenance' && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Maintenance History</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">
                                Last service performed on {new Date(selectedVehicle.lastServiceDate).toLocaleDateString()}
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
                )}

                {activeTab === 'location' && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Location</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                <span className="font-medium">Location:</span> {selectedVehicle.location}
                            </p>
                            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-md flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400">Map view would be displayed here</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Location History</h4>
                                <ul className="space-y-2">
                                    <li className="text-sm text-gray-600 dark:text-gray-300">• {selectedVehicle.location} - Current</li>
                                    <li className="text-sm text-gray-600 dark:text-gray-300">• Main Office - Yesterday</li>
                                    <li className="text-sm text-gray-600 dark:text-gray-300">• Field Site #3 - 2 days ago</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Usage Analytics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Daily Usage (miles)</h4>
                                <div className="h-64">
                                    <div className="flex items-end h-48 space-x-1">
                                        {selectedVehicle.dailyUsage.map((miles, index) => (
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
                                        {selectedVehicle.weeklyUsage.map((miles, index) => (
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
                )}
            </div>
        );
    };

    const renderAddVehicleForm = () => {
        return (
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Vehicle</h2>
                    <button
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormInput
                                label="Make"
                                name="make"
                                value={formData.make}
                                onChange={handleFormChange}
                                error={formErrors.make}
                                required
                            />
                            <FormInput
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleFormChange}
                                error={formErrors.model}
                                required
                            />
                            <FormInput
                                label="Year"
                                name="year"
                                type="number"
                                value={formData.year.toString()}
                                onChange={handleFormChange}
                                error={formErrors.year}
                                min="2000"
                                max={(new Date().getFullYear() + 1).toString()}
                                required
                            />
                            <FormSelect
                                label="Type"
                                name="type"
                                value={formData.type}
                                onChange={handleFormChange}
                                options={[
                                    { value: 'Sedan', label: 'Sedan' },
                                    { value: 'SUV', label: 'SUV' },
                                    { value: 'Truck', label: 'Truck' },
                                    { value: 'Van', label: 'Van' },
                                    { value: 'Electric', label: 'Electric' },
                                ]}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormInput
                                label="License Plate"
                                name="licensePlate"
                                value={formData.licensePlate}
                                onChange={handleFormChange}
                                error={formErrors.licensePlate}
                                required
                            />
                            <FormInput
                                label="VIN"
                                name="vin"
                                value={formData.vin}
                                onChange={handleFormChange}
                                error={formErrors.vin}
                                required
                            />
                            <FormInput
                                label="Mileage"
                                name="mileage"
                                type="number"
                                value={formData.mileage.toString()}
                                onChange={handleFormChange}
                                error={formErrors.mileage}
                                min="0"
                            />
                            <FormSelect
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleFormChange}
                                options={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Maintenance', label: 'Maintenance' },
                                    { value: 'Inactive', label: 'Inactive' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <FormInput
                            label="Color"
                            name="color"
                            value={formData.color}
                            onChange={handleFormChange}
                        />
                        <FormSelect
                            label="Fuel Type"
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleFormChange}
                            options={[
                                { value: 'Gasoline', label: 'Gasoline' },
                                { value: 'Diesel', label: 'Diesel' },
                                { value: 'Electric', label: 'Electric' },
                                { value: 'Hybrid', label: 'Hybrid' },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <FormInput
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            label="Purchase Date"
                            name="purchaseDate"
                            type="date"
                            value={formData.purchaseDate}
                            onChange={handleFormChange}
                            error={formErrors.purchaseDate}
                            required
                        />
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                        >
                            Add Vehicle
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vehicle Fleet Management</h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </header>

                {!selectedVehicle && !showAddForm && (
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="w-full md:w-auto">
                                <SearchInput
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search vehicles..."
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <FormSelect
                                    label="Filter by Type"
                                    name="filterType"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    options={[
                                        { value: 'all', label: 'All Types' },
                                        { value: 'Sedan', label: 'Sedan' },
                                        { value: 'SUV', label: 'SUV' },
                                        { value: 'Truck', label: 'Truck' },
                                        { value: 'Van', label: 'Van' },
                                        { value: 'Electric', label: 'Electric' },
                                    ]}
                                    noLabel
                                />
                                <FormSelect
                                    label="Filter by Status"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    options={[
                                        { value: 'all', label: 'All Statuses' },
                                        { value: 'Active', label: 'Active' },
                                        { value: 'Maintenance', label: 'Maintenance' },
                                        { value: 'Inactive', label: 'Inactive' },
                                    ]}
                                    noLabel
                                />
                                <button
                                    onClick={handleAddVehicle}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Add Vehicle
                                </button>
                            </div>
                        </div>
                        {renderVehicleList()}
                    </div>
                )}

                {selectedVehicle && renderVehicleDetails()}
                {showAddForm && renderAddVehicleForm()}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: Vehicle['status'] }) => {
    const colorMap = {
        Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        Maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        Inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[status]}`}>
      {status}
    </span>
    );
};

const VehicleTypeBadge = ({ type }: { type: Vehicle['type'] }) => {
    const colorMap = {
        Sedan: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        SUV: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        Truck: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        Van: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        Electric: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[type]}`}>
            {type}
        </span>
    );
};

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
        </div>
    );
};

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 my-6">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-400">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

const EmptyState = () => {
    return (
        <div className="text-center py-12">
            <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No vehicles found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
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
                    Add Vehicle
                </button>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="col-span-2 text-sm text-gray-900 dark:text-white">{value}</dd>
        </div>
    );
};

const FormInput = ({
                       label,
                       name,
                       type = 'text',
                       value,
                       onChange,
                       error,
                       required = false,
                       min,
                       max,
                       placeholder,
                       noLabel = false,
                   }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    min?: string;
    max?: string;
    placeholder?: string;
    noLabel?: boolean;
}) => {
    return (
        <div>
            {!noLabel && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                placeholder={placeholder}
                className={`block w-full rounded-md shadow-sm ${error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600'} 
          dark:bg-gray-700 dark:text-white`}
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

const FormSelect = ({
                        label,
                        name,
                        value,
                        onChange,
                        options,
                        noLabel = false,
                    }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    noLabel?: boolean;
}) => {
    return (
        <div>
            {!noLabel && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const SearchInput = ({
                         value,
                         onChange,
                         placeholder,
                     }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white sm:text-sm"
                placeholder={placeholder || 'Search...'}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default App;
