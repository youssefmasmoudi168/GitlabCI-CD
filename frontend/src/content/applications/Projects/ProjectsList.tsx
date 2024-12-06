import { Button, Card, CircularProgress } from '@mui/material';

import { useEffect, useState } from 'react';
import CreateProjectForm from './CreateProjectForm';
import ProjectsListTable from './ProjectsListTable';
import { AddTwoTone } from '@mui/icons-material';
import {
  useAddUsersToAffectedInProjectIdMutation,
  useCreateTestProjectMutation,
  useDeleteTestProjectByIdMutation,
  useFetchAllTestProjectsByUserIdQuery,
  useRemoveUsersFromAffectedInProjectIdMutation,
  useUpdateTestProjectByIdMutation
} from 'src/services/api/api';
import FormModal from 'src/components/FormModal';
import ActionBar from 'src/components/ActionBar';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import getCurrentUser from 'src/services/utils/getCurrentUser';
import { useSelector } from 'react-redux';
function ProjectsList() {
  const userId = getCurrentUser().id;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isVisitor: boolean = useSelector((state: any) => state.role.isVisitor);
  const {
    data: testProjects,
    isSuccess,
    isLoading,
    isError
  } = useFetchAllTestProjectsByUserIdQuery(userId);

  const [createTestProject] = useCreateTestProjectMutation();
  const [deleteTestProject] = useDeleteTestProjectByIdMutation();
  const [updateTestProject] = useUpdateTestProjectByIdMutation();
  const [addAffectations] = useAddUsersToAffectedInProjectIdMutation();
  const [removeAffectations] = useRemoveUsersFromAffectedInProjectIdMutation();
  return (
    <>
      <Card sx={{ width: '100%', padding: 2 }}>
        <ActionBar title="Projects">
          {!isVisitor && (
            <Button
              onClick={handleOpen}
              variant="contained"
              color="primary"
              startIcon={<AddTwoTone fontSize="small" />}
            >
              New Project
            </Button>
          )}
        </ActionBar>

        <FormModal
          title="New Project"
          handleClose={handleClose}
          open={open}
          formId="projectCreateForm"
          submitText="Create"
        >
          {!isVisitor && (
            <CreateProjectForm
              userId={userId}
              createTestProject={createTestProject}
              handleClose={handleClose}
            />
          )}
        </FormModal>

        {isSuccess && (
          <ProjectsListTable
            isVisitor={isVisitor}
            projectsList={testProjects}
            updateProject={updateTestProject}
            deleteProject={deleteTestProject}
            addAffectations={addAffectations}
            removeAffectations={removeAffectations}
          />
        )}
        {isLoading && <SuspenseLoader />}
        {isError && (
          <NoData
            handleOpen={handleOpen}
            message="No projects found."
            buttonText="New Project"
          />
        )}
      </Card>
    </>
  );
}

export default ProjectsList;
