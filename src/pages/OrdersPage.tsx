import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import OrdersTable from '../components/OrdersTable';

export default function OrdersPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ maxWidth: '100%' }}>
        <OrdersTable />
      </Container>
    </React.Fragment>
  );
}
