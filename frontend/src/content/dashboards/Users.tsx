import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import UsersList from '../applications/Users/UsersList';

function DashboardUseCase() {
  return (
    <>
      <Helmet>
        <title>Users List</title>
      </Helmet>
      <Container>
        <Typography variant="h2" sx={{ mt: 5 }}>
          Users
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 5 }}>
          Users List
        </Typography>
        <Grid item xs={12} xl={10}>
          <UsersList />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardUseCase;
