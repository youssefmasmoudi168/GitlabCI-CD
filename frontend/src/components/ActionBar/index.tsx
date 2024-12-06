import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

interface ActionBarProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ActionBar = (props: ActionBarProps) => {
  const { title, subtitle, children } = props;
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={'space-between'}
      spacing={2}
      sx={{ marginBottom: 2 }}
    >
      <Grid item>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default ActionBar;
