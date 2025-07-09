// src/components/ApplicationsTable.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Typography from '@mui/material/Typography';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';

// Number of records per fetch
const fetchSize = 25;

// Table column definitions
const columns = [
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'position', header: 'Position' },
  { accessorKey: 'status', header: 'Status' },
  {
    accessorKey: 'appliedDate',
    header: 'Applied Date',
    Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'interviewDate',
    header: 'Interview Date',
    Cell: ({ cell }) => {
      const val = cell.getValue();
      return val ? new Date(val).toLocaleString() : '—';
    },
  },
];

/**
 * Get job applications from localStorage.
 * TODO: Replace with API call to fetch applications in production.
 * @returns {Array} Array of application records.
 */
function getApplicationsFromLocalStorage() {
  const key = 'jobApplications';
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * ApplicationsTable component displays a table of job applications with infinite scroll and filtering.
 * @returns {JSX.Element} The rendered applications table.
 * @precondition Should be used within a React Router context and with valid data fetching setup.
 */
function ApplicationsTable() {
  const tableContainerRef = useRef(null);
  const rowVirtualizerInstanceRef = useRef(null);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  // Use localStorage for demo; replace with API in production
  const [applications, setApplications] = useState(getApplicationsFromLocalStorage());

  // Refresh table when localStorage changes (e.g., after applying)
  useEffect(() => {
    const onStorage = () => setApplications(getApplicationsFromLocalStorage());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Optionally, poll for changes (for single-tab demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications(getApplicationsFromLocalStorage());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={applications}
      enablePagination={false}
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      renderBottomToolbarCustomActions={() => (
        <Typography>
          Showing {applications.length} application{applications.length !== 1 ? 's' : ''}.
        </Typography>
      )}
      state={{ isLoading: false }}
    />
  );
}

// Wrap in React Query provider
const queryClient = new QueryClient();
export default function ApplicationsTableWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationsTable />
    </QueryClientProvider>
  );
}
