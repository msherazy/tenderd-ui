import { useState } from 'react';
import type { Vehicle } from '../types';
import api from '../services/api';
import axios from 'axios';
import {ENDPOINTS} from "../constants";

export function useCreateVehicle() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const mutateAsync = async (vehicle: Partial<Vehicle>) => {
		setLoading(true);
		setError(null);
		try {
			// Add mock usage data if not provided
			const vehicleWithUsageData = {
				...vehicle,
				dailyUsage: vehicle.dailyUsage || [10, 12, 8, 15, 9, 11, 7],
				weeklyUsage: vehicle.weeklyUsage || [70, 65, 80, 75],
			};

			const res = await api.post(ENDPOINTS.VEHICLE, vehicleWithUsageData);
			return res.data;
		} catch (err: unknown) {
			let msg = 'Failed to add vehicle';
			if (axios.isAxiosError(err)) {
				msg = err.response?.data?.message || err.message;
			} else if (err instanceof Error) {
				msg = err.message;
			}
			setError(msg);
			throw new Error(msg);
		} finally {
			setLoading(false);
		}
	};

	return { mutateAsync, loading, error };
}
