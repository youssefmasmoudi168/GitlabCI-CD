import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';

import { useLoaderData } from 'react-router';
import CreateUseCaseForm from './CreateUseCasesForm';
import UseCaseListTable from './UseCaseListTable';
import { AddTwoTone } from '@mui/icons-material';
import {
  useCreateUseCaseMutation,
  useDeleteUseCaseByIdMutation,
  useFetchAllUseCasesBySprintIdQuery,
  useUpdateUseCaseByIdMutation
} from 'src/services/api/api';
import ActionBar from 'src/components/ActionBar';
import FormModal from 'src/components/FormModal';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
function UseCasesList() {
  const result: any = useLoaderData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );
  const [sprintId, setSprintId] = useState();

  const {
    data: useCases,
    isSuccess,
    isLoading,
    isError
  } = useFetchAllUseCasesBySprintIdQuery(result[1].sprintId);

  useEffect(() => {
    if (isSuccess) {
      setSprintId(result[1].sprintId);
    }
  }, [isLoading, isSuccess]);

  const [createUseCase] = useCreateUseCaseMutation();
  const [deleteUseCase] = useDeleteUseCaseByIdMutation();
  const [updateUseCase] = useUpdateUseCaseByIdMutation();

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <ActionBar title="Use Cases">
          {!isVisitor && (
            <Button
              onClick={handleOpen}
              sx={{ marginBottom: 2 }}
              variant="contained"
              color="primary"
              startIcon={<AddTwoTone fontSize="small" />}
            >
              New Use Case
            </Button>
          )}
        </ActionBar>

        <FormModal
          open={open}
          handleClose={handleClose}
          title="New Use Case"
          submitText="Create"
          formId="useCaseCreateForm"
        >
          <CreateUseCaseForm
            sprintId={sprintId}
            createUseCase={createUseCase}
            handleClose={handleClose}
          />
        </FormModal>

        {isSuccess && (
          <UseCaseListTable
            isVisitor={isVisitor}
            useCases={useCases}
            updateUseCase={updateUseCase}
            deleteUseCase={deleteUseCase}
          />
        )}
        {isLoading && (
          <NoData
            handleOpen={handleOpen}
            message="No Use Cases found for this Sprint."
            buttonText="New Use Case"
          />
        )}
        {isError && <SuspenseLoader />}
      </Card>
    </>
  );
}

export default UseCasesList;
