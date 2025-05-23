import { useState } from 'react';
import type { Vehicle } from '../types';

export default function useCreateVehicle() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createVehicle = async (vehicle: Partial<Vehicle>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8080/api/v1/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicle),
            });
            if (!res.ok) throw new Error('Failed to create vehicle');
            return await res.json();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createVehicle, loading, error };
}