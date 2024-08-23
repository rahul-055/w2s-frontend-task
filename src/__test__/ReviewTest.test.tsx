import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Review from '../components/product/Review';

describe('Review Component', () => {
    const mockHandleClose = jest.fn(); // Mock function for handleClose

    const mockData = {
        reviews: [
            {
                rating: 5,
                comment: 'Excellent product!',
                date: '2024-08-01T00:00:00Z',
                reviewerName: 'John Doe',
                reviewerEmail: 'john.doe@example.com'
            },
            {
                rating: 3,
                comment: 'Average experience.',
                date: '2024-08-02T00:00:00Z',
                reviewerName: 'Jane Smith',
                reviewerEmail: 'jane.smith@example.com'
            }
        ]
    };

    it('renders the modal with reviews when open is true', async () => {
        render(<Review open={true} handleClose={mockHandleClose} viewData={mockData} />);

        // Check if modal is open
        expect(screen.getByText('Product Reviews')).toBeInTheDocument();
        expect(screen.getByText('Excellent product!')).toBeInTheDocument();
        expect(screen.getByText('Average experience.')).toBeInTheDocument();
    });

    it('does not render the modal when open is false', () => {
        render(<Review open={false} handleClose={mockHandleClose} viewData={mockData} />);

        // Check if modal is not visible
        expect(screen.queryByText('Product Reviews')).not.toBeInTheDocument();
    });
    it('displays the correct review data', async () => {
        render(<Review open={true} handleClose={mockHandleClose} viewData={mockData} />);

        // Check individual review details
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Excellent product!')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
});
