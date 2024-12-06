import { useState } from 'react';

import { Card, Typography, Button, Grid, Link, Chip } from '@mui/material';

import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import FormModal from 'src/components/FormModal';
import UpdateSprint from './UpdateSprint';
import ConfirmationModal from 'src/components/ConfirmationModal';

const SprintsListTable = (props: any) => {
  const [selectedSprint, setSelectedSprint] = useState<any>({});

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = (sprint: any) => {
    setSelectedSprint(sprint);
    setOpenDeleteConfirmation(true);
  };
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = (sprint: any) => {
    setSelectedSprint(sprint);
    setOpenUpdateForm(true);
  };
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);

  const navigate = useNavigate();

  const handleDelete = (id: any) => {
    handleCloseDeleteConfirmation();
    props.deleteSprint(id);
  };
  const columns: GridColDef[] = [
    {
      field: 'sprintField',
      headerName: 'Sprint',
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
                    to={`${params.row.id}/use-cases`}
                  >
                    {params.value?.sprintName}
                  </Link>
                </strong>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                size="small"
                label={
                  params.value?.useCases?.length
                    ? params.value?.useCases?.length === 1
                      ? `${params.value?.useCases?.length} Use Case`
                      : `${params.value?.useCases?.length} Use Cases`
                    : 'Empty'
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
        );
      },
      sortComparator: (v1: any, v2: any) => {
        return v1?.sprintName?.localeCompare(v2?.sprintName);
      }
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography noWrap>
          {params?.value === '0' ? (
            <Chip size="small" label="High" color="success" />
          ) : params?.value === '1' ? (
            <Chip size="small" label="Normal" color="primary" />
          ) : (
            <Chip size="small" label="Low" color="warning" />
          )}
        </Typography>
      )
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'userStory',
      headerName: 'User Story',
      minWidth: 200,
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
                  disabled={props.isVisitor}
                  size="small"
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

  const rows = props?.sprintsList.map((sprint: any, index: any) => {
    return {
      id: sprint?.id,
      sprintField: {
        sprintName: sprint?.sprintName,
        useCases: sprint?.useCases
      },
      priority: sprint?.priority,
      startDate: dayjs(sprint?.startDate).format('YYYY/MM/DD'),
      endDate: dayjs(sprint?.endDate).format('YYYY/MM/DD'),
      userStory: sprint?.userStory
    };
  });

  return (
    <Card>
      <DataGrid
        onCellClick={(params, event) => {
          if (params.field !== 'actions') {
            navigate(`${params.row.id}/use-cases`);
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
        open={openUpdateForm}
        handleClose={handleCloseUpdateForm}
        title={`Update Sprint ${selectedSprint?.sprintField?.sprintName}`}
        formId="sprintUpdateForm"
        submitText="Update"
      >
        <UpdateSprint
          updateSprint={props.updateSprint}
          handleCloseUpdateForm={handleCloseUpdateForm}
          sprint={selectedSprint}
        />
      </FormModal>

      <ConfirmationModal
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={() => handleDelete(selectedSprint.id)}
        title={`Delete Sprint ${selectedSprint?.sprintField?.sprintName}`}
        description={`Are you sure you want to delete Sprint ${selectedSprint?.sprintField?.sprintName}?`}
        confirmVariant="contained"
        confirmColor="error"
        confirmText="Delete"
        cancelVariant="text"
        cancelColor="error"
      />
    </Card>
  );
};

export default SprintsListTable;
