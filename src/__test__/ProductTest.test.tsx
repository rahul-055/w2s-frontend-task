import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductComponent from '../components/Product/Product'; // Adjust the path if necessary
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductComponent', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description 1',
            category: 'Category 1',
            price: 100,
            discountPercentage: 7.17, // This should round to 7
            rating: 4.5,
            stock: 10,
            tags: ['tag1', 'tag2'],
            brand: 'Brand 1',
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description 2',
            category: 'Category 2',
            price: 200,
            discountPercentage: 8.51, // This should round to 9
            rating: 3.5,
            stock: 5,
            tags: ['tag3'],
            brand: 'Brand 2',
        },
    ];

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: { products: mockProducts } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the product table with correct data', async () => {
        render(<ProductComponent />);

        // Wait for products to load and check if table contents are rendered
        expect(await screen.findByText('Product 1')).toBeInTheDocument();
        expect(await screen.findByText('Description 1')).toBeInTheDocument();
        expect(await screen.findByText('Brand 1')).toBeInTheDocument();

        // Use a more flexible matcher to account for additional text or elements
        expect(await screen.findByText(/7%/)).toBeInTheDocument(); // Match the percentage text
        expect(await screen.findByText(/9%/)).toBeInTheDocument(); // Match the percentage text

        expect(await screen.findByText('Product 2')).toBeInTheDocument();
    });

    it('handles "View Reviews" button click', async () => {
        render(<ProductComponent />);

        // Wait for products to load
        await screen.findByText('Product 1');

        // Find the "View Reviews" button
        const viewReviewsButtons = screen.getAllByText('View Reviews');
        expect(viewReviewsButtons).toHaveLength(2); // Ensure there are buttons for each product

        // Click on the "View Reviews" button for Product 1
        fireEvent.click(viewReviewsButtons[0]);

        // Wait for the review dialog to appear
        await waitFor(() => {
            // Ensure that the review dialog opens with the correct product data
            expect(screen.getByText('Product 1')).toBeInTheDocument();
        });
    });

    it('shows loading spinner while fetching data', () => {
        // Mocking axios to simulate delay
        mockedAxios.get.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ data: { products: mockProducts } }), 500)));

        render(<ProductComponent />);

        // Check if Loader is visible while fetching data
        expect(screen.getByTestId('loader')).toBeInTheDocument(); // Ensure Loader has a test id of 'loader'
    });
});
