import './index.css';
import { useState } from 'react';
import { useVehicleStore } from './features/vehicleStore';
import { FormSelect, SearchInput } from './components/FormComponents';
import { useVehicles } from './hooks';
import { VehicleDetails } from './components/VehicleDetails';
import { AddVehicleForm } from './components/AddVehicleForm';
import {VehicleList} from "./components/VehicleList.tsx";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { vehicles, loading, error } = useVehicles();

    console.log('vehicles: ',vehicles);
    // Get state and actions from our store
    const {
        selectedVehicle, activeTab, showAddForm,
        formData, formErrors, searchTerm, filterType, filterStatus,
        sortField, sortDirection,

        selectVehicle, setActiveTab, clearSelectedVehicle,
        toggleAddForm, updateFormData, submitVehicleForm,
        setSearchTerm, setFilterType, setFilterStatus, setSortField
    } = useVehicleStore();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData(
            name,
            name === 'year' || name === 'mileage' ? parseInt(value) || 0 : value
        );
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitVehicleForm();
    };

    // Filter and sort vehicles based on current filters and sort settings
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
                                    onClick={() => toggleAddForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Add Vehicle
                                </button>
                            </div>
                        </div>
                        <VehicleList
                            vehicles={sortedVehicles}
                            loading={loading}
                            error={error}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onVehicleSelect={selectVehicle}
                            onSort={setSortField}
                        />
                    </div>
                )}

                {selectedVehicle && (
                    <VehicleDetails
                        vehicle={selectedVehicle}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        onBack={clearSelectedVehicle}
                    />
                )}

                {showAddForm && (
                    <AddVehicleForm
                        formData={formData}
                        formErrors={formErrors}
                        onFormChange={handleFormChange}
                        onFormSubmit={handleFormSubmit}
                        onCancel={() => toggleAddForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
