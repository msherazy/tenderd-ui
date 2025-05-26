import { useState } from 'react';
import api from '../services/api';
import axios from 'axios';
import {ENDPOINTS} from "../constants";

export function useCreateMaintenance(vehicleId: string) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const mutateAsync = async (entry: {
		date: string;
		description: string;
		cost: number;
		mileage?: number;
		serviceCenter?: string;
		notes?: string;
		nextDueDate?: string;
	}) => {
		setLoading(true);
		setError(null);
		try {
			const res = await api.post(`${ENDPOINTS.MAINTENANCE}/${vehicleId}`, entry);
			return res.data;
		} catch (err: unknown) {
			let msg = 'Failed to add maintenance';
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
