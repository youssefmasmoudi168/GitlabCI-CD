import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserUpdateSchema, {
  UserUpdateInput
} from 'src/models/Users/UserUpdateSchema';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
const UserRow = (props: any) => {
  const normalizeRole = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_VISITOR':
        return 'Visitor';
      case 'ROLE_TESTOR':
        return 'Tester';
      default:
        return 'User';
    }
  };

  const { isVisitor, role } = useSelector((state: RootState) => state.role);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const handleOpenDeleteConfirmation = () => setOpenDeleteConfirmation(true);
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenUpdateForm = () => setOpenUpdateForm(true);
  const handleCloseUpdateForm = () => setOpenUpdateForm(false);

  const methods = useForm<UserUpdateInput>({
    resolver: zodResolver(UserUpdateSchema)
  });

  const { handleSubmit, register, setValue } = methods;
  const onSubmitHandler: SubmitHandler<UserUpdateInput> = (values) => {
    props.updateUser({ ...values });
  };
  // const [projectId, setProjectId] = useState();
  const handleDelete = (id: any) => {
    props.deleteUser(id);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    bgcolor: 'background.paper',
    borderRadius: '6px',
    boxShadow: 24,
    p: 4
  };
  const userId = props?.user?.id?.toString();
  useEffect(() => {
    setValue('id', userId);
  }, [setValue, userId]);
  const theme = useTheme();
  const user = props.user;

  return (
    <>
      {user && (
        <TableRow hover>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {user?.firstName}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {user?.lastName}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {user?.email}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              <Chip
                color="primary"
                size="small"
                label={normalizeRole(user?.roles[0])}
              ></Chip>
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {dayjs(user?.createdAt).format('YYYY/MM/DD HH:mm')}
            </Typography>
          </TableCell>

          <TableCell align="right">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {dayjs(user?.updatedAt).format('YYYY/MM/DD HH:mm')}
            </Typography>
          </TableCell>

          <TableCell align="right">
            <Tooltip title="Edit Order" arrow>
              <IconButton
                disabled={isVisitor}
                onClick={handleOpenUpdateForm}
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter
                  },
                  color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Modal
              open={openUpdateForm}
              onClose={handleCloseUpdateForm}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Container
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Typography component="h1" variant="h3">
                    Update User
                  </Typography>
                  <Input type="hidden" id="id" name="id" {...register('id')} />
                  <TextField
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="first Name"
                    defaultValue={user?.firstName}
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    {...register('firstName')}
                  />
                  <TextField
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    defaultValue={user?.lastName}
                    autoComplete="lastName"
                    {...register('lastName')}
                  />
                  <TextField
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    defaultValue={user?.email}
                    {...register('email')}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="roles">Role</InputLabel>
                    <Select
                      labelId="roles"
                      id="roles"
                      label="Roles"
                      {...register('roles', { setValueAs: (r) => [r] })}
                    >
                      <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                      <MenuItem value="ROLE_TESTOR">Testor</MenuItem>
                      <MenuItem value="ROLE_VISITOR">Visitor</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Container>
              </Box>
            </Modal>
            <Tooltip title="Delete Project" arrow>
              <IconButton
                disabled={isVisitor}
                onClick={handleOpenDeleteConfirmation}
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
              >
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Modal
              open={openDeleteConfirmation}
              onClose={handleCloseDeleteConfirmation}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography component="h1" variant="h3">
                  Do you really want to delete this user?
                </Typography>
                <Grid
                  container
                  columnSpacing={2}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Button
                      variant="text"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleCloseDeleteConfirmation}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleDelete(userId)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default UserRow;
