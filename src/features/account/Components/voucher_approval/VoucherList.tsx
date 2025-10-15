import React, { useState, useMemo, useCallback } from 'react';

 
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { VoucherItem, VoucherListProps } from '../../types/types';


// Define a state type for sorting
type SortConfig = {
    key: keyof VoucherItem | null;
    direction: 'ascending' | 'descending' | null;
};


const VoucherList: React.FC<VoucherListProps> = ({ title, data = [], columns }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [entriesPerPage, setEntriesPerPage] = useState<number>(5);
    
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });


    // Logic for Searching, Filtering, and Sorting
    const sortedAndFilteredData: VoucherItem[] = useMemo(() => {
        let currentData = [...data];

        // 1. Filtering Logic
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentData = currentData.filter(item =>
                Object.values(item).some(value =>
                    (typeof value === 'string' || typeof value === 'number') &&
                    String(value).toLowerCase().includes(lowerCaseSearchTerm)
                )
            );
        }

        // 2. Sorting Logic
        if (sortConfig.key !== null) {
            currentData.sort((a, b) => {
                
                const key = sortConfig.key as keyof VoucherItem; 
                const aValue = a[key];
                const bValue = b[key];

                if (aValue === undefined || bValue === undefined) {
                    return 0; 
                }

                // Convert to string for case-insensitive and general comparison
                const aStr = String(aValue).toLowerCase();
                const bStr = String(bValue).toLowerCase();

                if (aStr < bStr) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aStr > bStr) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return currentData;
    }, [data, searchTerm, sortConfig]);


    // Handler for Sorting
    const requestSort = useCallback((key: keyof VoucherItem) => {
        let direction: SortConfig['direction'] = 'ascending';
        
        // Cycle: null -> ascending -> descending -> null
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            setSortConfig({ key: null, direction: null });
            setCurrentPage(1);
            return; 
        }
        
        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page after sorting
    }, [sortConfig]);


    // Logic for Pagination 
    const totalEntries = sortedAndFilteredData.length;
    const totalPages: number = Math.ceil(totalEntries / entriesPerPage);
    const paginatedData: VoucherItem[] = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        return sortedAndFilteredData.slice(startIndex, endIndex);
    }, [sortedAndFilteredData, currentPage, entriesPerPage]);


    // Handlers 
    const handleEntriesChange = (value: string) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const startIndex = totalEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
    const endIndex = Math.min(currentPage * entriesPerPage, totalEntries);

    return (
        <div className="space-y-4 mb-8 p-4 border rounded-lg shadow-sm">
            {/* Title */}
            <h3 className="text-xl font-semibold border-b pb-2">{title}</h3>

            {/* Show Entries & Search*/}
            <div className="flex justify-between items-center space-x-4">
                {/* Show Entries */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Show</span>
                    <Select value={String(entriesPerPage)} onValueChange={handleEntriesChange}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm">entries</span>
                </div>

                {/* Search Input */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Search:</span>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="max-w-sm"
                    />
                </div>
            </div>

            {/* Table Body */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead 
                                    key={col.key as string} 
                                    className="font-bold hover:bg-muted/50 transition-colors"
                                >
                                    {/* Sort Button Wrapper: Clickable area for sorting */}
                                    <div 
                                        className="flex items-center justify-between space-x-1 cursor-pointer select-none"
                                        onClick={() => requestSort(col.key as keyof VoucherItem)}
                                    >
                                        <div>
                                            <span>{col.header}</span>
                                        </div>
                                        <div className="flex  flex-col ml-1">
                                            {/* Up Arrow (Ascending) */}
                                            <FaSortUp
                                                className={`h-4 w-4 ${sortConfig.key === col.key && sortConfig.direction === 'ascending' ? 'text-[#17A2B8]' : 'text-muted-foreground opacity-30'}`} 
                                            />
                                            {/* Down Arrow (Descending) */}
                                            <FaSortDown
                                                className={`h-4 w-4 -mt-1 ${sortConfig.key === col.key && sortConfig.direction === 'descending' ? 'text-[#17A2B8]' : 'text-muted-foreground opacity-30'}`} 
                                            />
                                        </div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Conditional Rendering: Data exists */}
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <TableRow key={item.id}>
                                    {columns.map((col) => (
                                        <TableCell key={col.key as string}>
                                            {item[col.key as keyof VoucherItem]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            // Conditional Rendering: No Data
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    **No data available in table**
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Conditional Pagination Footer */}
            {totalEntries > 0 && (
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    {/* Entry Info */}
                    <div>
                        Showing {startIndex} to {endIndex} of {totalEntries} entries
                        {searchTerm && ` (filtered from ${data.length} total)`}
                    </div>

                    {/* Pagination Controls  */}
                    <div>
                        <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={handlePrevious}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>

                            {/* Current Page Indicator */}
                            <PaginationItem className="hidden sm:inline-flex">
                                <Button variant="outline" size="sm" className="bg-[#17A2B8] text-primary-foreground hover:bg-primary/90">
                                    {currentPage}
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    onClick={handleNext}
                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoucherList;