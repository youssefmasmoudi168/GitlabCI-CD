import { Card, Container } from '@mui/material';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <Container sx={{ my: 3 }}>
      <Card sx={{ padding: 2 }}>{props.children}</Card>
    </Container>
  );
};

export default DashboardLayout;
