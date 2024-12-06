import { Button, Card, Grid, Typography } from '@mui/material';

import { useState } from 'react';

import { AddTwoTone } from '@mui/icons-material';

import ScenariosListTable from './ScenariosListTable';
import {
  useCreateScenarioMutation,
  useUpdateScenarioByIdMutation,
  useDeleteScenarioByIdMutation,
  useFetchAllScenariosQuery,
  useFetchAllTestProjectsByUserIdQuery
} from 'src/services/api/api';
import getCurrentUser from 'src/services/utils/getCurrentUser';
import FormModal from 'src/components/FormModal';
import CreateScenario from './CreateScenario';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

const ScenariosList = () => {
  const [open, setOpen] = useState(false);

  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );

  const { data: projects } = useFetchAllTestProjectsByUserIdQuery(
    getCurrentUser().id
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: scenarios,
    isLoading,
    isSuccess,
    isError
  } = useFetchAllScenariosQuery();

  const [createScenario] = useCreateScenarioMutation();
  const [deleteScenario] = useDeleteScenarioByIdMutation();
  const [updateScenario] = useUpdateScenarioByIdMutation();

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent={'space-between'}
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <Typography variant="h3">Scenarios</Typography>
          </Grid>
          <Grid item>
            {!isVisitor && (
              <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                startIcon={<AddTwoTone />}
              >
                New Scenario
              </Button>
            )}
          </Grid>
        </Grid>
        <FormModal
          open={open}
          handleClose={handleClose}
          title="New Scenario"
          submitText="Create"
          formId="scenarioCreateForm"
        >
          <CreateScenario
            projects={projects}
            handleClose={handleClose}
            createScenario={createScenario}
          />
        </FormModal>
        {isSuccess && (
          <ScenariosListTable
            isVisitor={isVisitor}
            projects={projects}
            ScenariosList={scenarios}
            updateScenario={updateScenario}
            deleteScenario={deleteScenario}
          />
        )}
        {isError && (
          <NoData
            handleOpen={handleOpen}
            message="No Scenarios found."
            buttonText="New Scenario"
          />
        )}
        {isLoading && <SuspenseLoader />}
      </Card>
    </>
  );
};

export default ScenariosList;
