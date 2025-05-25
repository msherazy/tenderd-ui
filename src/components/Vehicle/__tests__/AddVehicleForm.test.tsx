import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddVehicleForm } from '../AddVehicleForm'

describe('AddVehicleForm', () => {
    it('renders fields and submit button', () => {
        render(<AddVehicleForm
            formData={{
                make: '',
                model: '',
                type: 'Sedan',
                status: 'Active',
                fuelType: 'Gasoline',
                year: 2022,
                vin: '',
                mileage: 0,
                color: '',
                location: '',
                _id: '',
                licensePlate: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastServiceDate: new Date().toISOString(),
                purchaseDate: new Date().toISOString()
            }}
            formErrors={{}}
            onFormChange={jest.fn()}
            onFormSubmit={jest.fn()}
            onCancel={jest.fn()}
        />)
        expect(screen.getByLabelText(/make/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/model/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/year/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /add vehicle/i })).toBeInTheDocument()
    })

    it('calls onFormSubmit when submitted', () => {
        const handleSubmit = jest.fn(e => e.preventDefault())

        // Render the form
        render(<AddVehicleForm
            formData={{
                make: 'Toyota',
                model: 'Corolla',
                type: 'Sedan',
                status: 'Active',
                fuelType: 'Gasoline',
                year: 2022,
                vin: '',
                mileage: 0,
                color: '',
                location: '',
                _id: '',
                licensePlate: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastServiceDate: new Date().toISOString(),
                purchaseDate: new Date().toISOString()
            }}
            formErrors={{}}
            onFormChange={jest.fn()}
            onFormSubmit={handleSubmit}
            onCancel={jest.fn()}
        />)

        // Get the form and submit it directly
        const form = screen.getByRole('form') || document.querySelector('form')
        fireEvent.submit(form)

        // Check if the handler was called
        expect(handleSubmit).toHaveBeenCalled()
    })

    it('calls onCancel when cancel button is clicked', async () => {
        const user = userEvent.setup()
        const handleCancel = jest.fn()

        render(<AddVehicleForm
            formData={{
                make: '',
                model: '',
                type: 'Sedan',
                status: 'Active',
                fuelType: 'Gasoline',
                year: 2022,
                vin: '',
                mileage: 0,
                color: '',
                location: '',
                _id: '',
                licensePlate: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                lastServiceDate: new Date().toISOString(),
                purchaseDate: new Date().toISOString()
            }}
            formErrors={{}}
            onFormChange={jest.fn()}
            onFormSubmit={jest.fn()}
            onCancel={handleCancel}
        />)

        await user.click(screen.getByRole('button', { name: /cancel/i }))
        expect(handleCancel).toHaveBeenCalled()
    })

    it('shows form errors when present', () => {
        render(<AddVehicleForm
            formData={{
                make: '',
                model: '',
                type: 'Sedan',
                status: 'Active',
                fuelType: 'Gasoline',
                year: 2022,
                vin: '',
                mileage: 0,
                color: '',
                location: '',
                _id: '',
                licensePlate: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                lastServiceDate: new Date().toISOString(),
                purchaseDate: new Date().toISOString()
            }}
            formErrors={{
                make: 'Make is required',
                model: 'Model is required'
            }}
            onFormChange={jest.fn()}
            onFormSubmit={jest.fn()}
            onCancel={jest.fn()}
        />)

        expect(screen.getByText('Make is required')).toBeInTheDocument()
        expect(screen.getByText('Model is required')).toBeInTheDocument()
    })
})
