import { Card, Grid, Typography, Link, Chip, Button } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NavLink, useNavigate } from 'react-router-dom';
import { Delete, Edit, PictureAsPdf } from '@mui/icons-material';
import { useState } from 'react';
import dayjs from 'dayjs';
import FormModal from 'src/components/FormModal';
import UpdateScenario from './UpdateScenario';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { useCreateRapportMutation } from 'src/services/api/api';

const ScenariosListTable = (props: any) => {
  const [selectedScenario, setSelectedScenario] = useState<any>({});

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = (scenario: any) => {
    setOpenDeleteConfirmation(true);
    setSelectedScenario(scenario);
  };
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = (scenario: any) => {
    setOpenUpdateForm(true);
    setSelectedScenario(scenario);
  };
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);

  const handleDelete = (id: any) => {
    handleCloseDeleteConfirmation();
    props.deleteScenario(id);
  };

  const navigate = useNavigate();

  const [createRapport] = useCreateRapportMutation();
  const columns: GridColDef[] = [
    {
      field: 'scenarioField',
      headerName: 'Scenario',
      flex: 1.5,
      minWidth: 200,
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
                    {params.value?.designation}
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
        return v1?.designation?.localeCompare(v2?.designation);
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 50,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
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
      minWidth: 400,
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
                  startIcon={<PictureAsPdf />}
                  size="small"
                  variant="text"
                  disabled={
                    props.isVisitor ||
                    params.row?.scenarioField?.useCases?.testCases == null
                  }
                  onClick={() =>
                    createRapport({ scenario: params?.row?.id?.toString() })
                  }
                >
                  Export PDF
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

  const rows = props?.ScenariosList.map((scenario: any, index: any) => {
    return {
      id: scenario?.id,
      scenarioField: {
        designation: scenario?.designation,
        useCases: scenario?.UseCase
      },
      description: scenario?.description,
      date: dayjs(scenario?.date).format('YYYY/MM/DD')
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
        title="Update Scenario"
        submitText="Update"
        formId="updateScenarioForm"
      >
        <UpdateScenario
          handleCloseUpdateForm={handleCloseUpdateForm}
          updateScenario={props.updateScenario}
          scenario={selectedScenario}
          projects={props.projects}
        />
      </FormModal>

      <ConfirmationModal
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={() => handleDelete(selectedScenario?.id.toString())}
        title="Delete Scenario"
        description="Do you really want to delete this scenario?"
        cancelColor="error"
        cancelVariant="text"
        confirmText="Delete"
        confirmColor="error"
        confirmVariant="contained"
      />
    </Card>
  );
};

export default ScenariosListTable;
