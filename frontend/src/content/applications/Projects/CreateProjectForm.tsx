import { zodResolver } from '@hookform/resolvers/zod';
import { Container, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {  useEffect } from 'react';
import ProjectSchema, { ProjectInput } from 'src/models/Projects/ProjectSchema';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const CreateProjectForm = (props: any) => {
  const methods = useForm<ProjectInput>({
    resolver: zodResolver(ProjectSchema)
  });

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    setValue
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue('user', props?.userId?.toString());
    setValue('dateCreation', dayjs().toDate());
  });

  const onSubmitHandler: SubmitHandler<ProjectInput> = (values) => {
    props.handleClose();
    props.createTestProject({ ...values });
  };

  return (
    <Container
      component="form"
      id="projectCreateForm"
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="projectName"
        label="Project Name"
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
            defaultValue={dayjs()}
          />
        )}
      />
    </Container>
  );
};

export default CreateProjectForm;
