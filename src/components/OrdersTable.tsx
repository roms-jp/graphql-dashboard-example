import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import GraphQLApi from '../services/GraphQLApi';
import { CircularProgress } from '@mui/material';

export default function DenseTable() {
  const [state, setState] = useState({ items: [], loading: false });

  const fetchData = async () => {
    console.log('Fetching');
    setState((ps) => ({ ...ps, loading: true }));
    GraphQLApi.getOrders()
      .then((resp) => {
        if (resp) {
          const { data } = resp;
          setState((ps) => ({ ...ps, items: data.findManyOrders }));
        }
      })
      .then(() => {
        setState((ps) => ({ ...ps, loading: false }));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return state.loading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100vh - 150px)',
        alignItems: 'center',
      }}
    >
      <CircularProgress status="loading" />
    </div>
  ) : (
    <TableContainer
      id="tomate"
      component={Paper}
      style={{ maxHeight: 'calc(100vh - 150px)' }}
    >
      {state.items?.length > 0 && (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {Object.keys(state.items[0])
                .filter((key) => !['__typename'].includes(key))
                .map((col) => (
                  <TableCell component="th" scope="row">
                    {col}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(item).map((col) => (
                  <TableCell component="th" scope="row">
                    {item[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
