import { render, screen } from '@testing-library/react';
import { VehicleList } from '../VehicleList';
import type { Vehicle } from '../../../types';


describe('VehicleList Component', () => {
  const mockVehicles: Vehicle[] = [
      {
          _id: 'vehicle-1',
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          type: 'Sedan',
          status: 'Active',
          mileage: 15000,
          licensePlate: 'ABC123',
          createdAt: '2022-01-01',
          updatedAt: '2022-06-01',
          lastServiceDate: '',
          color: '',
          fuelType: 'Electric',
          vin: '',
          purchaseDate: '',
          dailyUsage: [],
          weeklyUsage: []
      },
      {
          _id: 'vehicle-2',
          make: 'Honda',
          model: 'CR-V',
          year: 2021,
          type: 'SUV',
          status: 'Maintenance',
          mileage: 20000,
          licensePlate: 'XYZ789',
          createdAt: '2022-01-05',
          updatedAt: '2022-06-01',
          lastServiceDate: '',
          color: '',
          fuelType: 'Electric',
          vin: '',
          purchaseDate: '',
          dailyUsage: [],
          weeklyUsage: []
      },
  ];

  const defaultProps = {
    vehicles: mockVehicles,
    loading: false,
    error: null,
    sortField: 'make' as keyof Vehicle,
    sortDirection: 'asc' as const,
    onVehicleSelect: jest.fn(),
    onSort: jest.fn(),
  };

  test('renders empty state when vehicles array is empty', () => {
    render(<VehicleList {...defaultProps} vehicles={[]} />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  test('renders vehicle data in the table correctly', () => {
    render(<VehicleList {...defaultProps} />);

    // Check if the table headers are rendered - using getByRole to find table headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers.length).toBeGreaterThanOrEqual(5); // At least 5 columns

    expect(headers.some(h => h.textContent?.includes('Make'))).toBeTruthy();
    expect(headers.some(h => h.textContent?.includes('Model'))).toBeTruthy();
    expect(headers.some(h => h.textContent?.includes('Year'))).toBeTruthy();
    expect(headers.some(h => h.textContent?.includes('Type'))).toBeTruthy();
    expect(headers.some(h => h.textContent?.includes('Status'))).toBeTruthy();

    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('Camry')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Honda')).toBeInTheDocument();
    expect(screen.getByText('CR-V')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  test('displays sort indicators correctly', () => {
    render(<VehicleList {...defaultProps} sortField="model" sortDirection="desc" />);
    const modelHeader = screen.getByText(/Model/);
    expect(modelHeader.textContent).toContain('↓'); // Down arrow for descending
  });

  test('matches snapshot', () => {
    const { container } = render(<VehicleList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with error', () => {
    const { container } = render(<VehicleList {...defaultProps} error="Error loading vehicles" />);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with empty vehicles array', () => {
    const { container } = render(<VehicleList {...defaultProps} vehicles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
