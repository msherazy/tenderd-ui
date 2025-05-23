import './index.css';
import { useVehicleStore } from './features/vehicleStore';
import { FormSelect, SearchInput } from './components/FormComponents';
import { useVehicles } from './hooks';
import { VehicleDetails } from './components/VehicleDetails';
import { AddVehicleForm } from './components/AddVehicleForm';
import {VehicleList} from "./components/VehicleList.tsx";

const App = () => {
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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Vehicle Fleet Management</h1>
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
