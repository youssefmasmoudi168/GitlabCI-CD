import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  CssBaseline,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProjectSchema from 'src/models/Projects/ProjectSchema';
import { UserInput } from 'src/models/Users/UserSchema';
import FormModal from 'src/components/FormModal';
import {
  Abc,
  AlternateEmail,
  Password,
} from '@mui/icons-material';

const CreateUserForm = (props: any) => {
  const theme = useTheme();

  const methods = useForm<UserInput>({
    resolver: zodResolver(ProjectSchema)
  });

  const {
    register,
  } = methods;


  return (
    <Container component="main" maxWidth="xs">
      <FormModal
        title="New User"
        open={props.open}
        handleClose={props.handleClose}
        formId="userCreateForm"
        submitText="Create"
      >
        <TextField
          margin="normal"
          variant="outlined"
          required
          size="small"
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Abc fontSize="small" sx={{ color: theme.palette.grey[500] }} />
              </InputAdornment>
            )
          }}
          {...register('firstName')}
        />
        <TextField
          margin="normal"
          variant="outlined"
          required
          size="small"
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Abc fontSize="small" sx={{ color: theme.palette.grey[500] }} />
              </InputAdornment>
            )
          }}
          {...register('lastName')}
        />
        <TextField
          margin="normal"
          variant="outlined"
          required
          size="small"
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500] }}
                />
              </InputAdornment>
            )
          }}
          {...register('email')}
        />
        <FormControl fullWidth size="small" margin="normal">
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
        <TextField
          size="small"
          margin="normal"
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          itemType="password"
          autoComplete="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500] }}
                />
              </InputAdornment>
            )
          }}
          {...register('password')}
        />
      </FormModal>
      <CssBaseline />
    </Container>
  );
};

export default CreateUserForm;
