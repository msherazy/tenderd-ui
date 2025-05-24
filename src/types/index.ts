export interface Vehicle {
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
	maintenanceHistory?: Array<unknown>; //TODO: Define MaintenanceRecord type
}

export type VehicleFormData = Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>;
