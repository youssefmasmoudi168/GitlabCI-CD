import { Helmet } from 'react-helmet-async';
import {  Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import ProjectsList from 'src/content/applications/Projects/ProjectsList';

function Projects() {
  return (
    <>
      <Helmet>
        <title>Liste Projects</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Grid item xs={12}>
          <ProjectsList />
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Projects;
