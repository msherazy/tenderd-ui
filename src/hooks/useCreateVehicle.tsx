import { useState } from 'react';
import type { Vehicle } from '../types';
import api from '../services/api';

export function useCreateVehicle() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutateAsync = async (vehicle: Partial<Vehicle>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/vehicles', vehicle);
            return res.data;
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Failed to create vehicle';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { mutateAsync, loading, error };
}
