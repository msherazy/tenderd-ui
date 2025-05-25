import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';

export function useVehicleDetails(id: string | null) {
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		fetch(`/api/vehicles/${id}`)
			.then(res => res.json())
			.then(data => setVehicle(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	return { vehicle, loading, error };
}
