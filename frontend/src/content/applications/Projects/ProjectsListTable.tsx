import { useState } from 'react';
import { Card, Link, Grid, Chip, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Delete, Edit, Person } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import FormModal from 'src/components/FormModal';
import UpdateProject from './UpdateProject';
import ConfirmationModal from 'src/components/ConfirmationModal';
import UpdateAffectations from './UpdateAffectations';

const ProjectsListTable = (props: any) => {
  const [selectedProject, setSelectedProject] = useState<any>();

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = (project: any) => {
    setSelectedProject(project);
    setOpenDeleteConfirmation(true);
  };
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = (project: any) => {
    setSelectedProject(project);
    setOpenUpdateForm(true);
  };
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);

  const [openUpdateAffectaions, setOpenUpdateAffectations] = useState(false);
  const handleOpenUpdateAffectations = (project: any) => {
    setSelectedProject(project);
    setOpenUpdateAffectations(true);
  };
  const handleCloseUpdateAffectations = () => setOpenUpdateAffectations(false);

  const handleDelete = (id: any) => {
    handleCloseDeleteConfirmation();
    props.deleteProject(id);
  };

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'projectField',
      headerName: 'Project',
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
                    to={`${params.row.id}/sprints`}
                  >
                    {params.value?.projectName}
                  </Link>
                </strong>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                size="small"
                label={
                  params.value?.sprints?.length
                    ? params.value?.sprints?.length === 1
                      ? `${params.value?.sprints?.length} Sprint`
                      : `${params.value?.sprints?.length} Sprints`
                    : 'Empty'
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
        );
      },
      sortComparator: (v1: any, v2: any) => {
        return v1?.projectName?.localeCompare(v2?.projectName);
      }
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      flex: 1,
      minWidth: 50,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'author',
      headerName: 'Author',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <strong>{params?.value}</strong>
        </Typography>
      )
    },
    {
      field: 'client',
      headerName: 'Client',
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
                  startIcon={<Person />}
                  disabled={props.isVisitor}
                  size="small"
                  variant="text"
                  onClick={() => handleOpenUpdateAffectations(params.row)}
                >
                  Affect
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

  const rows = props?.projectsList
    .map((project: any) => {
      return {
        id: project?.id,
        projectField: {
          projectName: project?.projectName,
          sprints: project?.sprints
        },
        creationDate: dayjs(project?.creationDate).format('YYYY/MM/DD'),
        author: project?.author,
        client: project?.client,
        affectations: project?.affectations[0]
      };
    })
    .filter((p) => p.projectField.projectName !== undefined);

  return (
    <Card>
      <DataGrid
        onCellClick={(params, event) => {
          if (params.field !== 'actions') {
            navigate(`${params.row.id}/sprints`);
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
        title={`Update Project`}
        subtitle={`${selectedProject?.projectField?.projectName}`}
        submitText="Update"
        formId="projectUpdateForm"
      >
        <UpdateProject
          project={selectedProject}
          updateProject={props.updateProject}
          handleCloseUpdateForm={handleCloseUpdateForm}
        />
      </FormModal>

      <ConfirmationModal
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        title={`Delete ${selectedProject?.projectField.projectName}`}
        description={`Are you sure you want to delete ${selectedProject?.projectField?.projectName} ?`}
        onConfirm={() => handleDelete(selectedProject?.id)}
        confirmText="Delete"
        confirmVariant="contained"
        confirmColor="error"
        cancelVariant="text"
        cancelColor="error"
      />

      <FormModal
        open={openUpdateAffectaions}
        title="Update Affectations"
        handleClose={handleCloseUpdateAffectations}
        submitText="Save"
        formId="updateAffectationsForm"
      >
        <UpdateAffectations project={selectedProject} />
      </FormModal>
    </Card>
  );
};

export default ProjectsListTable;
