import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Input,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import TestCaseSchema, {
  TestCaseInput
} from 'src/models/TestCases/TestCaseSchema';

interface CreateTestCaseFormProps {
  createTestCase: (testCase: TestCaseInput) => void;
  useCaseId: number;
  handleClose: () => void;
}

const CreateTestCaseForm = (props: CreateTestCaseFormProps) => {
  const methods = useForm<TestCaseInput>({
    resolver: zodResolver(TestCaseSchema)
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful },
    setValue
  } = methods;

  useEffect(() => {
    setValue('useCaseId', props?.useCaseId?.toString());
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<TestCaseInput> = (values) => {
    props.handleClose();
    props.createTestCase({ ...values });
  };

  return (
    <Container
      id="testCaseCreateForm"
      component="form"
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Input
        type="hidden"
        id="useCaseId"
        name="useCaseId"
        {...register('useCaseId')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        {...register('name')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="summary"
        label="Summary"
        name="summary"
        autoComplete="summary"
        {...register('summary')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        {...register('title')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="actor"
        label="Actor"
        name="actor"
        autoComplete="actor"
        {...register('actor')}
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="precondition"
        label="Precondition"
        name="precondition"
        autoComplete="precondition"
        {...register('precondition')}
      />
    </Container>
  );
};

export default CreateTestCaseForm;
