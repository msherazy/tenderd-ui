export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    type: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Electric';
    status: 'Active' | 'Maintenance' | 'Inactive';
    licensePlate: string;
    mileage: number;
    lastServiceDate: string;
    fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
    purchaseDate: string;
    dailyUsage: number[];
    weeklyUsage: number[];
};

export type VehicleFormData = Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>;

