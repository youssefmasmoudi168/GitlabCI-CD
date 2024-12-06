import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,

} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SprintSchema, {
  SprintInput
} from '../../../models/Sprints/SprintSchema';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const CreateSprintForm = (props: any) => {
  const [priority, setPriority] = useState<string>('');

  const methods = useForm<SprintInput>({
    resolver: zodResolver(SprintSchema),
    defaultValues: {
      testProject: props?.projectId?.toString(),
      startDate: dayjs(),
      endDate: dayjs().add(1, 'week')
    }
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    getValues,
    control
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SprintInput> = (values) => {
    props.handleClose();
    console.log(values);
    props.createSprint({ ...values });
  };

  const handleChange = (event) => {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority);
  };

  return (
    <Container
      component="form"
      id="sprintCreateForm"
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="sprintName"
        label="Sprint Name"
        name="sprintName"
        autoComplete="sprintName"
        autoFocus
        {...register('sprintName')}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="priority">Priority</InputLabel>
        <Controller
          name="priority"
          control={control}
          render={({
            field: { onChange = handleChange, value = priority }
          }) => (
            <Select
              required
              name="priority"
              labelId="priority"
              id="priority"
              value={value}
              label="Priority"
              onChange={onChange}
            >
              <MenuItem value="0">High</MenuItem>
              <MenuItem value="1">Normal</MenuItem>
              <MenuItem value="2">Low</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            reduceAnimations
            sx={{ width: '100%', marginTop: '1rem' }}
            value={getValues('startDate')}
            label="Start Date"
            disableFuture
            disablePast
            {...register('startDate')}
            defaultValue={dayjs()}
          />
        )}
      />

      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            reduceAnimations
            sx={{ width: '100%', marginTop: '1rem' }}
            value={getValues('startDate').add(1, 'week')}
            label="End Date"
            maxDate={getValues('startDate').add(4, 'week')}
            disablePast
            {...register('endDate')}
          />
        )}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="userStory"
        label="User Story"
        name="userStory"
        multiline
        autoComplete="userStory"
        {...register('userStory')}
      />
    </Container>
  );
};

export default CreateSprintForm;
