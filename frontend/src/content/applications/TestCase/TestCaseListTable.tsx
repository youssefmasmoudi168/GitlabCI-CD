import { useState } from 'react';

import { Card, Typography, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import UpdateTestCase from './UpdateTestCase';
import FormModal from 'src/components/FormModal';
import ConfirmationModal from 'src/components/ConfirmationModal';

const TestCaseListTable = (props: any) => {
  const [selectedTestCase, setSelectedTestCase] = useState<any>({});

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = (testCase: any) => {
    setOpenDeleteConfirmation(true);
    setSelectedTestCase(testCase);
  };
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = (testCase: any) => {
    setOpenUpdateForm(true);
    setSelectedTestCase(testCase);
  };
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);
  const handleDelete = (id: any) => {
    handleCloseDeleteConfirmation();
    props.deleteTestCase(id);
  };
  const columns: GridColDef[] = [
    {
      field: 'testCaseName',
      headerName: 'Test Case',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <Typography noWrap>
            <strong>{params?.value}</strong>
          </Typography>
        );
      }
    },
    {
      field: 'summary',
      headerName: 'Summary',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'actor',
      headerName: 'Actor',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'preCondition',
      headerName: 'Precondition',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 250,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Button
                  startIcon={<Edit />}
                  size="small"
                  disabled={props.isVisitor}
                  variant="text"
                  onClick={() => handleOpenUpdateForm(params.row)}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<Delete />}
                  size="small"
                  disabled={props.isVisitor}
                  variant="text"
                  color="error"
                  onClick={() => handleOpenDeleteConfirmation(params.row)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </>
        );
      }
    }
  ];

  const rows = props?.testCases.map((testCase: any, index: any) => {
    return {
      id: testCase?.id,
      testCaseName: testCase?.testCaseName,
      summary: testCase?.summary,
      title: testCase?.title,
      actor: testCase?.actor,
      preCondition: testCase?.preCondition
    };
  });

  return (
    <Card>
      <DataGrid
        disableColumnMenu
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
      />

      <FormModal
        title="Update Test Case"
        submitText="Update"
        formId="testCaseUpdateForm"
        open={openUpdateForm}
        handleClose={handleCloseUpdateForm}
      >
        <UpdateTestCase
          updateTestCase={props.updateTestCase}
          testCase={selectedTestCase}
          handleCloseUpdateForm={handleCloseUpdateForm}
        />
      </FormModal>

      <ConfirmationModal
        onConfirm={() => handleDelete(selectedTestCase?.id)}
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        title="Delete Test Case"
        description="Do you really want to delete this Test Case?"
        confirmText="Delete"
        confirmColor="error"
        confirmVariant="contained"
        cancelColor="error"
        cancelVariant="text"
      />
    </Card>
  );
};

export default TestCaseListTable;
