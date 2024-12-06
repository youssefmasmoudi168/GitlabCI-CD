import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SprintUpdateSchema, {
  SprintUpdateInput
} from 'src/models/Sprints/SprintUpdateSchema';
import { ArrowDownward, ArrowRightAlt, ArrowUpward } from '@mui/icons-material';

interface UpdateSprintProps {
  sprint: any;
  updateSprint: any;
  handleCloseUpdateForm: any;
}

const UpdateSprint = (props: UpdateSprintProps) => {
  const methods = useForm<SprintUpdateInput>({
    resolver: zodResolver(SprintUpdateSchema),
    defaultValues: {
      id: props?.sprint?.id.toString(),
      sprintName: props?.sprint?.sprintField?.sprintName,
      priority: props?.sprint?.priority,
      startDate: dayjs(props?.sprint?.startDate),
      endDate: dayjs(props?.sprint?.endDate),
      userStory: props?.sprint?.userStory
    }
  });

  const {
    reset,
    handleSubmit,
    register,
    control,
    setValue,
    getValues
  } = methods;

  const onSubmitHandler: SubmitHandler<SprintUpdateInput> = (values) => {
    console.log(values);
    props?.handleCloseUpdateForm();
    props?.updateSprint({ ...values });
  };

  return (
    <>
      <Container
        component="form"
        noValidate
        id="sprintUpdateForm"
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="sprintName"
          label="Sprint Name"
          name="sprintName"
          autoComplete="sprintName"
          autoFocus
          {...register('sprintName')}
        />

        <FormControl required>
          <FormLabel id="priority-radio-group">Priority</FormLabel>
          <RadioGroup
            name="priority"
            onChange={(e, p) => setValue('priority', p)}
            row
            aria-labelledby="priority-radio-group"
          >
            <FormControlLabel
              value="0"
              control={
                <Radio
                  disableRipple
                  size="small"
                  icon={<ArrowUpward />}
                  checkedIcon={<ArrowUpward color="success" />}
                />
              }
              label="High"
            />
            <FormControlLabel
              value="1"
              control={
                <Radio
                  disableRipple
                  size="small"
                  icon={<ArrowRightAlt />}
                  checkedIcon={<ArrowRightAlt color="primary" />}
                />
              }
              label="Normal"
            />
            <FormControlLabel
              value="2"
              control={
                <Radio
                  disableRipple
                  size="small"
                  icon={<ArrowDownward />}
                  checkedIcon={<ArrowDownward color="warning" />}
                />
              }
              label="Low"
            />
          </RadioGroup>
        </FormControl>

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              sx={{ width: '100%', marginTop: '1rem' }}
              label="Start Date"
              value={getValues('startDate')}
              onChange={(date) => setValue('startDate', dayjs(date))}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              sx={{ width: '100%', marginTop: '1rem' }}
              label="End Date"
              value={getValues('endDate')}
              onChange={(date) => setValue('endDate', dayjs(date))}
            />
          )}
        />

        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="userStory"
          label="User Story"
          name="userStory"
          autoComplete="userStory"
          {...register('userStory')}
        />
      </Container>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default UpdateSprint;
