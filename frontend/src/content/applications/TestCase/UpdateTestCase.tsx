import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Input, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TestCaseUpdateSchema, {
  TestCaseUpdateInput
} from 'src/models/TestCases/TestCaseUpdateSchema';

interface UpdateTestCaseProps {
  updateTestCase: any;
  testCase: any;
  handleCloseUpdateForm: any;
}

const UpdateTestCase = (props: UpdateTestCaseProps) => {
  const methods = useForm<TestCaseUpdateInput>({
    resolver: zodResolver(TestCaseUpdateSchema),
    defaultValues: {
      id: props?.testCase?.id.toString(),
      name: props?.testCase?.testCaseName,
      summary: props?.testCase?.summary,
      title: props?.testCase?.title,
      actor: props?.testCase?.actor,
      precondition: props?.testCase?.preCondition
    }
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitSuccessful, errors }
  } = methods;

  const onSubmitHandler: SubmitHandler<TestCaseUpdateInput> = (values) => {
    console.log(values);
    props?.handleCloseUpdateForm();
    props?.updateTestCase({ ...values });
  };

  return (
    <Container
      component="form"
      id="testCaseUpdateForm"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
     
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

export default UpdateTestCase;
