import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CreateSprintForm from './CreateSprintForm';
import SprintsListTable from './SprintsListTable';

import { AddTwoTone } from '@mui/icons-material';
import {
  useCreateSprintMutation,
  useDeleteSprintByIdMutation,
  useFetchAllSprintsByProjectIdQuery,
  useUpdateSprintByIdMutation
} from 'src/services/api/api';
import ActionBar from 'src/components/ActionBar';
import FormModal from 'src/components/FormModal';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
function SprintsList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );

  const result: any = useLoaderData();

  const {
    data: sprints,
    isError,
    isLoading,
    isSuccess
  } = useFetchAllSprintsByProjectIdQuery(result[1].projectId);
  const [projectId, setProjectId] = useState();

  useEffect(() => {
    if (isSuccess) {
      setProjectId(result[1].projectId);
    }
  }, [isLoading, isSuccess, sprints]);

  const [createSprint] = useCreateSprintMutation();
  const [deleteSprint] = useDeleteSprintByIdMutation();
  const [updateSprint] = useUpdateSprintByIdMutation();

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <ActionBar title="Sprints">
          {!isVisitor && (
            <Button
              onClick={handleOpen}
              sx={{ marginBottom: 2 }}
              variant="contained"
              color="primary"
              startIcon={<AddTwoTone fontSize="small" />}
            >
              New Sprint
            </Button>
          )}
        </ActionBar>
        <FormModal
          open={open}
          handleClose={handleClose}
          title="New Sprint"
          submitText="Create"
          formId="sprintCreateForm"
        >
          <CreateSprintForm
            projectId={projectId}
            createSprint={createSprint}
            handleClose={handleClose}
          />
        </FormModal>
        {isSuccess && (
          <SprintsListTable
            isVisitor={isVisitor}
            sprintsList={sprints}
            updateSprint={updateSprint}
            deleteSprint={deleteSprint}
          />
        )}
        {isError && (
          <NoData
            handleOpen={handleOpen}
            message="No Sprints found for this project"
            buttonText="New Sprint"
          />
        )}
        {isLoading && <SuspenseLoader />}
      </Card>
    </>
  );
}

export default SprintsList;
