import { useState } from 'react';

import { Card, Typography, Button, Grid, Link, Chip } from '@mui/material';

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NavLink, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import ConfirmationModal from 'src/components/ConfirmationModal';
import UpdateUseCase from './UpdateUseCase';
import FormModal from 'src/components/FormModal';

const UseCaseListTable = (props: any) => {
  const [selectedUseCase, setSelectedUseCase] = useState<any>(null);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = (useCase: any) => {
    setSelectedUseCase(useCase);
    setOpenDeleteConfirmation(true);
  };
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = (useCase: any) => {
    setSelectedUseCase(useCase);
    setOpenUpdateForm(true);
  };
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);

  const handleDelete = (id: any) => {
    handleCloseDeleteConfirmation();
    props.deleteUseCase(id);
  };

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'useCaseField',
      headerName: 'Use Case',
      flex: 1.5,
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <Grid container alignItems="center" spacing={1} wrap="nowrap">
            <Grid item>
              <Typography noWrap>
                <strong>
                  <Link
                    underline="none"
                    color="inherit"
                    component={NavLink}
                    to={`${params.row.id}/test-cases`}
                  >
                    {params.value?.title}
                  </Link>
                </strong>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                size="small"
                label={
                  params.value?.testCases?.length
                    ? params.value?.testCases?.length === 1
                      ? `${params.value?.testCases?.length} Test Case`
                      : `${params.value?.testCases?.length} Test Cases`
                    : 'Empty'
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
        );
      },
      sortComparator: (v1: any, v2: any) => {
        return v1?.title?.localeCompare(v2?.title);
      }
    },
    {
      field: 'prereq',
      headerName: 'Prerequirements',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'expectedResult',
      headerName: 'Expected Result',
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
                  disabled={props.isVisitor}
                  startIcon={<Edit />}
                  size="small"
                  variant="text"
                  onClick={() => handleOpenUpdateForm(params.row)}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={props.isVisitor}
                  startIcon={<Delete />}
                  size="small"
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

  const rows = props?.useCases.map((useCase: any, index: any) => {
    return {
      id: useCase?.id,
      useCaseField: {
        title: useCase?.title,
        testCases: useCase?.testCases
      },
      prereq: useCase?.prereq,
      expectedResult: useCase?.expectedResult
    };
  });

  return (
    <Card>
      <DataGrid
        onCellClick={(params, event) => {
          if (params.field !== 'actions') {
            navigate(`${params.row.id}/test-cases`);
          }
        }}
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
        title={`Update Use Case ${selectedUseCase?.useCaseField?.title}`}
        submitText="Update"
        open={openUpdateForm}
        handleClose={handleCloseUpdateForm}
        formId="useCaseUpdateForm"
      >
        <UpdateUseCase
          useCase={selectedUseCase}
          handleCloseUpdateForm={handleCloseUpdateForm}
          updateUseCase={props.updateUseCase}
        />
      </FormModal>

      <ConfirmationModal
        onConfirm={() => handleDelete(selectedUseCase?.id)}
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        title={`Delete Use Case ${selectedUseCase?.useCaseField?.title}`}
        description={`Are you sure you want to delete the use case ${selectedUseCase?.useCaseField?.title}?`}
        confirmColor="error"
        confirmText="Delete"
        confirmVariant="contained"
        cancelColor="error"
        cancelVariant="text"
      />
    </Card>
  );
};

export default UseCaseListTable;
