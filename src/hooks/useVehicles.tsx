import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';

export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/v1/vehicles')
            .then(res => res.json())
            .then(data => setVehicles(data.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { vehicles, loading, error, setVehicles };
}