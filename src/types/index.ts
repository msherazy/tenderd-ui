import type { ReactNode } from 'react';

export interface Vehicle {
	location?: ReactNode;
	updatedAt: string | number | Date;
	createdAt: string | number | Date;
	_id: string;
	make: string;
	model: string;
	year: number;
	type: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Electric';
	status: 'Active' | 'Maintenance' | 'Inactive';
	licensePlate: string;
	mileage: number;
	lastServiceDate: string;
	color: string;
	fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
	vin: string;
	purchaseDate: string;
	dailyUsage: number[];
	weeklyUsage: number[];
	maintenanceHistory?: Array<Maintenance>;
}

export interface Maintenance {
	_id: string;
	vehicle: string;
	date: string | Date;
	description: string;
	cost: number;
	mileage?: number;
	serviceCenter?: string;
	notes?: string;
	nextDueDate?: string | Date;
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface MaintenanceFormData {
	date: string;
	description: string;
	cost: number;
	mileage?: number;
	serviceCenter: string;
	notes: string;
	nextDueDate?: string;
}

export type VehicleFormData = Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>;
