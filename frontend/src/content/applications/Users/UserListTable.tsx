
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';
import UserRow from './UserRow';

const UsersListTable = (props: any) => {
  const updateUser = props?.updateUser;
  const deleteUser = props?.deleteUser;

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.usersList?.map((user, index) => {
              return (
                <UserRow
                  key={index}
                  user={user}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UsersListTable;
