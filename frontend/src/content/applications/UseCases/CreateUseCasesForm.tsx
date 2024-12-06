import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Input,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import UseCaseSchema, { UseCaseInput } from 'src/models/UseCases/UseCaseSchema';

const CreateUseCaseForm = (props: any) => {
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
  const methods = useForm<UseCaseInput>({
    resolver: zodResolver(UseCaseSchema)
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful},
    setValue
  } = methods;

  useEffect(() => {
    setValue('sprint', props?.sprintId?.toString());
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<UseCaseInput> = (values) => {
    reset();
    props.handleClose();
    props.createUseCase({ ...values });
  };

  return (
    <Container
      component="form"
      sx={{ mt: 1 }}
      id="useCaseCreateForm"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Input type="hidden" id="sprint" name="sprint" {...register('sprint')} />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        {...register('title')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="prereq"
        label="Prerequirements"
        name="prereq"
        autoComplete="prereq"
        {...register('prereq')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="expectedResult"
        label="Expected Result"
        name="expectedResult"
        autoComplete="expectedResult"
        {...register('expectedResult')}
      />
    </Container>
  );
};

export default CreateUseCaseForm;
