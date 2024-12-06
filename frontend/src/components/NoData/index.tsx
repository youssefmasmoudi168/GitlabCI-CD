import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';

interface NoDataProps {
  handleOpen: () => void;
  message: string;
  buttonText: string;
}

const NoData = (props: NoDataProps) => {
  return (
    <Card elevation={1}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ padding: 2 }}
      >
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {props.message}
          </Typography>
        </Grid>
        <Grid item>
          <img
            height={180}
            src="/static/images/status/no-data.svg"
            alt="No Data"
          />
        </Grid>
        <Grid item>
          <Button onClick={props.handleOpen} variant="text" size="small">
            {props.buttonText}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default NoData;
