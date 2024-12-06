import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';

import { Outlet } from 'react-router';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex"  py={5} px={4} alignItems="center">
          <Logo />
        </Box>
          <Outlet />
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
