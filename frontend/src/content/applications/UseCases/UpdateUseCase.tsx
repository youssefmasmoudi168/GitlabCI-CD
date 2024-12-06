import { zodResolver } from '@hookform/resolvers/zod';
import { Container,  TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UseCaseUpdateSchema, {
  UseCaseUpdateInput
} from 'src/models/UseCases/UseCaseUpdateSchema';

interface UpdateUseCaseProps {
  useCase: any;
  handleCloseUpdateForm: any;
  updateUseCase: any;
}

const UpdateUseCase = (props: UpdateUseCaseProps) => {
  const methods = useForm<UseCaseUpdateInput>({
    resolver: zodResolver(UseCaseUpdateSchema),
    defaultValues: {
      id: props?.useCase?.id.toString(),
      title: props?.useCase?.title,
      prereq: props?.useCase?.prereq,
      expectedResult: props?.useCase?.expectedResult
    }
  });

  const {
    handleSubmit,
    register,
  } = methods;

  const onSubmitHandler: SubmitHandler<UseCaseUpdateInput> = (values) => {
    console.log(values);
    props?.handleCloseUpdateForm();
    props?.updateUseCase({ ...values });
  };

  return (
    <Container
      component="form"
      id="useCaseUpdateForm"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="title"
        label="Title"
        defaultValue={props.useCase?.useCaseField?.title}
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
        label="prerequirements"
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

export default UpdateUseCase;
