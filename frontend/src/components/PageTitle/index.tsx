import { FC } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid, Breadcrumbs, Link } from '@mui/material';
import { NavLink, useLocation, useMatches } from 'react-router-dom';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = 'Dashboard',
  subHeading = '',
  docs = '',
  ...rest
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item>
        <Button
          href={docs}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Scenario
        </Button>
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string
};

export default PageTitle;
