import { render, screen, fireEvent } from '@testing-library/react';
import { AddMaintenanceForm } from '../AddMaintenanceForm';

describe('AddMaintenanceForm', () => {
	const today = new Date();
	const nextMonth = new Date(today);
	nextMonth.setMonth(today.getMonth() + 1);

	const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
	const nextMonthStr = nextMonth.toISOString().split('T')[0];

	const defaultProps = {
		formData: {
			date: todayStr,
			description: 'Oil Change',
			cost: 50,
			mileage: 5000,
			serviceCenter: 'Test Center',
			notes: 'Test Notes',
			nextDueDate: nextMonthStr,
		},
		formErrors: {},
		onFormChange: jest.fn(),
		onFormSubmit: jest.fn(),
		onCancel: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders fields and submit button', () => {
		render(<AddMaintenanceForm {...defaultProps} />);

		// Use getByLabelText instead of getByTestId since we might have issues with data-testid forwarding
		expect(screen.getByLabelText('Date')).toBeInTheDocument();
		expect(screen.getByLabelText('Description')).toBeInTheDocument();
		expect(screen.getByLabelText('Cost')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
	});

	it('calls onFormSubmit when form is submitted', async () => {
		const handleSubmit = jest.fn(e => e.preventDefault());

		// Use fireEvent directly which is more reliable in some cases
		render(<AddMaintenanceForm {...defaultProps} onFormSubmit={handleSubmit} />);

		// Use fireEvent.submit directly on the form element
		const form = screen.getByRole('form');
		fireEvent.submit(form);

		expect(handleSubmit).toHaveBeenCalled();
	});

	it('shows form errors when present', () => {
		render(
			<AddMaintenanceForm
				{...defaultProps}
				formErrors={{
					date: 'Date is required',
					description: 'Description is required',
				}}
			/>,
		);

		expect(screen.getByText('Date is required')).toBeInTheDocument();
		expect(screen.getByText('Description is required')).toBeInTheDocument();
	});
});
