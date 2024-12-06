import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import ScenariosList from '../applications/Scenarios/ScenariosList';

function DashboardScenarios() {
  return (
    <>
      <Helmet>
        <title>Scenarios List</title>
      </Helmet>
      <Container sx={{ my: 3 }}>
        <Grid item xs={12} xl={10}>
          <ScenariosList />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardScenarios;
