import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  useCreateUserMutation,
  useDeleteUserByIdMutation,
  useFetchAllUsersQuery,
  useUpdateUserByIdMutation
} from 'src/services/api/userApi';
import CreateUserForm from './CreateUser';
import UsersListTable from './UserListTable';
import NoData from 'src/components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
function UsersList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );
  const { isLoading, data, isSuccess, isError } = useFetchAllUsersQuery();

  const [users, setUsers] = useState();

  useEffect(() => {
    if (isSuccess) {
      setUsers(data);
    }
  }, [isLoading]);

  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [updateUser] = useUpdateUserByIdMutation();

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <Button
          onClick={handleOpen}
          sx={{ marginBottom: 2 }}
          variant="contained"
          color="primary"
        >
          + Create new User
        </Button>
        <CreateUserForm
          createUser={createUser}
          open={open}
          handleClose={handleClose}
        />
        {isSuccess && (
          <UsersListTable
            usersList={users}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        )}

        {isError && (
          <NoData
            handleOpen={handleOpen}
            message="Error fetching users"
            buttonText="Try creating a new user"
          />
        )}

        {isLoading && <SuspenseLoader />}
      </Card>
    </>
  );
}

export default UsersList;
