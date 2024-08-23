import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import styled from '@emotion/styled';
import Review from '../product/Review';
import Loader from '../../ui/loader';
import PercentageCircle from '../../ui/percentagecircle';
import Navbar from '../layouts/navbar'
import { Typography } from '@mui/material';

// Define the structure of a product object
interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: any;
    brand: string;
}

// Define the columns for the product table
const columns: ColumnDef<Product>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Title',
        accessorKey: 'title',
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Category',
        accessorKey: 'category',
    },
    {
        header: 'Price',
        accessorKey: 'price',
    },
    {
        header: 'Discount Percentage',
        accessorKey: 'discountPercentage',
    },
    {
        header: 'Rating',
        accessorKey: 'rating',
    },
    {
        header: 'Stock',
        accessorKey: 'stock',
    },
    {
        header: 'Tags',
        accessorKey: 'tags',
    },
    {
        header: 'Brand',
        accessorKey: 'brand',
    },
    {
        header: 'Actions',
        accessorKey: 'action',
    },
];



// Styled components for table
const TableContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
`;

const Tr = styled.tr<{ isOdd: boolean }>`
  background-color: ${({ isOdd }) => (isOdd ? '#f0f0f0' : '#ffffff')};
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

// Main component to display the product list
const ProductComponent: React.FC = () => {
    const [open, setOpen] = useState(false);   // State to manage modal visibility
    const handleClose = () => setOpen(false);  // Function to close the modal
    const [data, setData] = useState<Product[]>([]);  // State to store product data
    const [viewData, setViewData] = useState<Product>();  // State to store selected product for review
    const [isLoading, setIsLoading] = useState(true);  // State to manage loading status

    // Function to handle clicking the "View Reviews" button
    const handleViewReviews = (product: Product) => {
        setViewData(product)
        setOpen(true);
    };

    // Fetch product data from API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const updatedProducts = response.data.products.map((product: Product) => ({
                    ...product,
                    action: <button onClick={() => handleViewReviews(product)} className='px-4 bg-blue-400 leading-6 font-semibold rounded text-white' >View Reviews</button>,
                    brand: <span >{product.brand ? product.brand : '------'}</span>,
                    tags: <span >{product.tags ? product.tags.join() : '------'}</span>,
                    discountPercentage: <PercentageCircle value={product.discountPercentage} />
                }));
                setData(updatedProducts);
                if (response) {
                    setIsLoading(false)   // Set loading to false once data is fetched
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // Initializes the table with data and columns
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <>
            {!isLoading ?
                <div>
                    <Navbar ></Navbar>
                    <TableContainer>
                        <Typography className='mb-3 text-3xl'>Product List</Typography>
                        <Table>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <Tr key={headerGroup.id} isOdd={false}>
                                        {headerGroup.headers.map((header: any) => (
                                            <Th key={header.id}>{header.column.columnDef.header}</Th>
                                        ))}
                                    </Tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, index) => (
                                    <Tr key={row.id} isOdd={index % 2 === 0}>
                                        {row.getVisibleCells().map((cell: any) => {
                                            return <Td key={cell.id}>{cell.getValue()}</Td>
                                        }
                                        )}
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                    <Review open={open} handleClose={handleClose} viewData={viewData} />
                </div>
                :
                <Loader />
            }
        </>
    );
};

export default ProductComponent;
