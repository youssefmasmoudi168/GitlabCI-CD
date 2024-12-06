import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

import CreateTestCaseForm from './CreateTestCase';
import TestCaseListTable from './TestCaseListTable';
import { AddTwoTone } from '@mui/icons-material';
import {
  useCreateTestCaseMutation,
  useDeleteTestCaseByIdMutation,
  useFetchAllTestCasesByUseCaseIdQuery,
  useUpdateTestCaseByIdMutation
} from 'src/services/api/api';
import ActionBar from 'src/components/ActionBar';
import FormModal from 'src/components/FormModal';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
function TestCasesList() {
  const result: any = useLoaderData();
  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [useCaseId, setUseCaseId] = useState();

  const {
    data: testCases,
    isLoading,
    isSuccess,
    isError
  } = useFetchAllTestCasesByUseCaseIdQuery(result.useCaseId);

  useEffect(() => {
    if (isSuccess) {
      setUseCaseId(result.useCaseId);
    }
  }, [isLoading, isSuccess, testCases]);

  const [createTestCase] = useCreateTestCaseMutation();
  const [deleteTestCase] = useDeleteTestCaseByIdMutation();
  const [updateTestCase] = useUpdateTestCaseByIdMutation();

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <ActionBar title="Test Cases">
          {!isVisitor && (
            <Button
              onClick={handleOpen}
              sx={{ marginBottom: 2 }}
              variant="contained"
              color="primary"
              startIcon={<AddTwoTone fontSize="small" />}
            >
              New Test Case
            </Button>
          )}
        </ActionBar>

        <FormModal
          title="New Test Case"
          submitText="Create"
          formId="testCaseCreateForm"
          open={open}
          handleClose={handleClose}
        >
          <CreateTestCaseForm
            handleClose={handleClose}
            useCaseId={useCaseId}
            createTestCase={createTestCase}
          />
        </FormModal>

        {isSuccess && (
          <TestCaseListTable
            isVisitor={isVisitor}
            testCases={testCases}
            updateTestCase={updateTestCase}
            deleteTestCase={deleteTestCase}
          />
        )}
        {isError && (
          <NoData
            handleOpen={handleOpen}
            message="No Test Cases found for this Use Case"
            buttonText="New Test Case"
          />
        )}
        {isLoading && <SuspenseLoader />}
      </Card>
    </>
  );
}

export default TestCasesList;
