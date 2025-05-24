import { useState } from 'react';
import type { Vehicle } from '../types';

export function useCreateVehicle() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutateAsync = async (vehicle: Partial<Vehicle>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8080/api/v1/vehicles', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(vehicle),
            });
            
            if (!res.ok) {
                console.error('Error response:', res);
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create vehicle');
            }
            
            const data = await res.json();
            return data;
        } catch (err) {
            console.error('Failed to create vehicle:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutateAsync, loading, error };
}
