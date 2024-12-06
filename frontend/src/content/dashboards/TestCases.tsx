import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import TestCasesList from '../applications/TestCase/TestCaseList';

function DashboardTestCase() {
  return (
    <>
      <Helmet>
        <title>Liste Test Case</title>
      </Helmet>

      <Container sx={{ my: 2 }}>
        <Grid item xs={12} xl={10}>
          <TestCasesList />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardTestCase;
