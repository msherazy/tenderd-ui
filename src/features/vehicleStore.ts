import { create } from 'zustand';
import axios from 'axios';

type Maintenance = {
    _id: string;
    date: string;
    description: string;
    // ...add other fields as needed
};

type Vehicle = {
    _id: string;
    make: string;
    model: string;
    year: number;
    vin: string;
    licensePlate: string;
    mileage: number;
    maintenanceHistory: Maintenance[];
    // ...add other fields as needed
};

type State = {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    fetchVehicles: () => void;
};

export const useVehicleStore = create<State>((set) => ({
    vehicles: [],
    loading: false,
    error: null,
    fetchVehicles: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:8080/api/v1/vehicles');
            set({
                vehicles: res.data.data || [],
                loading: false,
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));