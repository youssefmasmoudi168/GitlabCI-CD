import { Helmet } from 'react-helmet-async';
import {  Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import SprintsList from 'src/content/applications/Sprints/SprintsList';

function DashboardSprint() {
  return (
    <>
      <Helmet>
        <title>Liste sprints</title>
      </Helmet>
      <Container sx={{ my: 2 }}>
        <Grid item xs={12} xl={10}>
          <SprintsList />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardSprint;
