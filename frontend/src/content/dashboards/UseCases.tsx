import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import UseCasesList from '../applications/UseCases/UseCasesList';

function DashboardUseCase() {
  return (
    <>
      <Helmet>
        <title>Liste Use Case</title>
      </Helmet>
      <Container sx={{ my: 2 }}>
        <Grid item xs={12} xl={10}>
          <UseCasesList />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardUseCase;
