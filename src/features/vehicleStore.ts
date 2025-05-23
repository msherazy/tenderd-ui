import { create } from 'zustand';
import type {Vehicle, VehicleFormData} from '../types';

interface VehicleState {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    selectedVehicle: Vehicle | null;
    activeTab: string;
    showAddForm: boolean;
    formData: VehicleFormData;
    formErrors: Record<string, string>;
    searchTerm: string;
    filterType: string;
    filterStatus: string;
    sortField: keyof Vehicle;
    sortDirection: 'asc' | 'desc';

    // Actions
    fetchVehicles: () => Promise<void>;
    selectVehicle: (vehicle: Vehicle) => void;
    setActiveTab: (tab: string) => void;
    clearSelectedVehicle: () => void;
    toggleAddForm: (show: boolean) => void;
    updateFormData: (name: string, value: string | number) => void;
    resetFormData: () => void;
    validateForm: () => boolean;
    submitVehicleForm: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    setFilterType: (type: string) => void;
    setFilterStatus: (status: string) => void;
    setSortField: (field: keyof Vehicle) => void;
    toggleSortDirection: () => void;
}

const DEFAULT_FORM_DATA: VehicleFormData = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'Sedan',
    status: 'Active',
    licensePlate: '',
    mileage: 0,
    lastServiceDate: new Date().toISOString().split('T')[0],
    fuelType: 'Gasoline',
    purchaseDate: new Date().toISOString().split('T')[0],
};

export const useVehicleStore = create<VehicleState>((set, get) => ({
    vehicles: [],
    loading: false,
    error: null,
    selectedVehicle: null,
    activeTab: 'details',
    showAddForm: false,
    formData: { ...DEFAULT_FORM_DATA },
    formErrors: {},
    searchTerm: '',
    filterType: 'all',
    filterStatus: 'all',
    sortField: 'make',
    sortDirection: 'asc',

    fetchVehicles: async () => {
        set({ loading: true, error: null });
        try {
            // Mock API call - replace with actual API call
            const response = await new Promise<Vehicle[]>(resolve =>
                setTimeout(() => resolve([]), 500)
            );
            set({ vehicles: response, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    selectVehicle: (vehicle: Vehicle) => {
        set({ selectedVehicle: vehicle, activeTab: 'details' });
    },

    setActiveTab: (tab: string) => {
        set({ activeTab: tab });
    },

    clearSelectedVehicle: () => {
        set({ selectedVehicle: null });
    },

    toggleAddForm: (show: boolean) => {
        set({ showAddForm: show });
        if (!show) {
            get().resetFormData();
        }
    },

    updateFormData: (name: string, value: string | number) => {
        set(state => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }));
    },

    resetFormData: () => {
        set({ formData: { ...DEFAULT_FORM_DATA }, formErrors: {} });
    },

    validateForm: () => {
        const { formData } = get();
        const errors: Record<string, string> = {};

        if (!formData.make.trim()) errors.make = 'Make is required';
        if (!formData.model.trim()) errors.model = 'Model is required';
        if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
            errors.year = 'Invalid year';
        }
        if (!formData.licensePlate.trim()) errors.licensePlate = 'License plate is required';
        if (formData.mileage < 0) errors.mileage = 'Mileage must be positive';
        if (!formData.purchaseDate) errors.purchaseDate = 'Purchase date is required';

        set({ formErrors: errors });
        return Object.keys(errors).length === 0;
    },

    setSearchTerm: (term: string) => {
        set({ searchTerm: term });
    },

    setFilterType: (type: string) => {
        set({ filterType: type });
    },

    setFilterStatus: (status: string) => {
        set({ filterStatus: status });
    },

    setSortField: (field: keyof Vehicle) => {
        const { sortField} = get();
        if (sortField === field) {
            get().toggleSortDirection();
        } else {
            set({ sortField: field, sortDirection: 'asc' });
        }
    },

    toggleSortDirection: () => {
        set(state => ({
            sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
        }));
    },

    submitVehicleForm: async () => {
        const isValid = get().validateForm();
        if (!isValid) return;

        set({ loading: true, error: null });
        try {
            const { formData } = get();
            // Mock API call - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Generate a mock ID for the new vehicle
            const newVehicle: Vehicle = {
                ...formData,
                id: `v-${Date.now()}`,
                dailyUsage: [0, 0, 0, 0, 0, 0, 0],
                weeklyUsage: [0, 0, 0, 0]
            };

            set(state => ({
                vehicles: [...state.vehicles, newVehicle],
                loading: false,
                showAddForm: false
            }));
            get().resetFormData();
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    }
}));
