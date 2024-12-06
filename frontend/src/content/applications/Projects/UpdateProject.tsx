import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Input, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ProjectUpdateSchema, {
  ProjectUpdateInput
} from 'src/models/Projects/ProjectUpdateSchema';

interface UpdateProjectProps {
  project: any;
  handleCloseUpdateForm: () => void;
  updateProject: (project: ProjectUpdateInput) => void;
}

const UpdateProject = (props: UpdateProjectProps) => {
  const methods = useForm<ProjectUpdateInput>({
    resolver: zodResolver(ProjectUpdateSchema)
  });

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    control,
    formState: { isSubmitSuccessful, errors }
  } = methods;

  const onSubmitHandler: SubmitHandler<ProjectUpdateInput> = (values) => {
    reset();
    props.handleCloseUpdateForm();
    props.updateProject({ ...values });
  };

  useEffect(() => {
    setValue('id', props?.project?.id?.toString());
    setValue('dateCreation', dayjs().toDate());
  }, [setValue, props?.project]);

  return (
    <Container
      component="form"
      id="projectUpdateForm"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Input type="hidden" id="id" name="id" {...register('id')} />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="projectName"
        label="Project Name"
        defaultValue={props.project?.projectField.projectName}
        name="projectName"
        autoComplete="projectName"
        autoFocus
        {...register('projectName')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="author"
        label="Author"
        name="author"
        defaultValue={props.project?.author}
        autoComplete="author"
        {...register('author')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="client"
        label="Client"
        name="client"
        autoComplete="client"
        defaultValue={props.project?.client}
        {...register('client')}
      />
      <Controller
        name="dateCreation"
        control={control}
        render={({ field }) => (
          <DatePicker
            sx={{ width: '100%', marginTop: '1rem' }}
            label="Creation Date"
            disableFuture
            value={dayjs()}
          />
        )}
      />
    </Container>
  );
};

export default UpdateProject;
