import * as React from 'react';
import { Autocomplete, Container, TextField } from '@mui/material';
import { useFetchAllUsersQuery } from 'src/services/api/userApi';
import {
  useAddUsersToAffectedInProjectIdMutation,
  useRemoveUsersFromAffectedInProjectIdMutation
} from 'src/services/api/api';

export default function UpdateAffectations(props: any) {
  const { data: allUsers, isSuccess } = useFetchAllUsersQuery();

  const [users, setUsers] = React.useState<any>([]);

  React.useEffect(() => {
    if (isSuccess) {
      setUsers(allUsers);
    }
  }, [allUsers, isSuccess]);

  const getAffectedUsers = (project: any) => {
    const users = [];
    project?.affectations?.user?.forEach((user: any) => {
      users.push(user);
    });
    if (users.length === 0) {
      return null;
    }
    return users;
  };

  const [selectedUsers, setSelectedUsers] = React.useState(
    getAffectedUsers(props?.project)
  );

  const [usersToRemove, setUsersToRemove] = React.useState<any>([]);
  const [usersToAdd, setUsersToAdd] = React.useState<any>([]);

  const [affectUser] = useAddUsersToAffectedInProjectIdMutation();
  const [removeUser] = useRemoveUsersFromAffectedInProjectIdMutation();

  const handleSubmit = () => {
    usersToAdd?.forEach((user) => {
      const body = { id: user.id, project_id: props.project.id };
      affectUser(body);
    });
    usersToRemove?.forEach((user) => {
      const body = { id: user.id, project_id: props.project.id };
      removeUser(body);
    });
  };

  return (
    <Container
      component="form"
      id="updateAffectationsForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <Autocomplete
        id="users-select"
        ChipProps={{ size: 'small' }}
        fullWidth
        multiple
        options={users}
        getOptionLabel={(option: any) =>
          `${option.firstName} ${option.lastName}`
        }
        isOptionEqualToValue={(option: any, value: any) => {
          return option.id === value.id;
        }}
        value={selectedUsers}
        onChange={(event: any, value: any, reason: any) => {
          setSelectedUsers(value);
          if (reason === 'clear') {
            setUsersToRemove(users);
          } else if (reason === 'removeOption') {
            let toRemove = getAffectedUsers(props?.project)?.filter(
              (user: any) => !value.includes(user)
            );
            setUsersToRemove(toRemove);
          } else if (reason === 'selectOption') {
            setUsersToAdd(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            required
            margin="normal"
            fullWidth
            {...params}
            label="Select Users"
          />
        )}
      />
    </Container>
  );
}
