import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Autocomplete,
  Container,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ScenarioUpdateSchema, {
  ScenarioUpdateInput
} from 'src/models/Scenario/ScenarioUpdateSchema';
import { useFetchUseCaseByScenarioIdQuery } from 'src/services/api/api';

const UpdateScenario = (props: any) => {
  const methods = useForm<ScenarioUpdateInput>({
    resolver: zodResolver(ScenarioUpdateSchema),
    defaultValues: {
      id: props?.scenario?.id.toString(),
      designation: props?.scenario?.designation,
      description: props?.scenario?.description,
      date: props?.scenario?.date,
      UseCase: props?.scenario?.UseCase
    }
  });

  const projects = props?.projects;
  const scenario = props?.scenario;

  const [selectedProject, setSelectedProject] = useState<any>();
  const [selectedUseCases, setSelectedUseCases] = useState<any>([]);

  const getUseCases = (project: any) => {
    const uc = [];
    project?.sprints?.forEach((sprint: any) => {
      sprint?.useCases?.forEach((useCase: any) => {
        uc.push(useCase);
      });
    });
    if (uc.length === 0) {
      return [];
    }
    return uc;
  };

  const [date, setDate] = useState<dayjs.Dayjs>(dayjs(scenario.date));
  const onSubmitHandler: SubmitHandler<ScenarioUpdateInput> = (values) => {
    props.handleCloseUpdateForm();
    props?.updateScenario({ ...values });
  };

  const {
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    setValue,
  } = methods;

  const { data, isSuccess } = useFetchUseCaseByScenarioIdQuery(
    props.scenario.id
  );

  useEffect(() => {
    if (isSuccess) {
      setValue('UseCase', data);
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue('date', date);
  }, [date]);

  return (
    <Container
      component="form"
      id="updateScenarioForm"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="designation"
        label="Designation"
        defaultValue={scenario.scenarioField.designation}
        name="designation"
        autoComplete="designation"
        autoFocus
        {...register('designation')}
      />

      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        autoComplete="description"
        {...register('description')}
      />

      <Autocomplete
        id="project-select"
        fullWidth
        options={projects}
        getOptionLabel={(option: any) => option.projectName}
        value={selectedProject}
        onChange={(event: any, value: any) => setSelectedProject(value)}
        renderInput={(params) => (
          <TextField
            required
            margin="normal"
            fullWidth
            {...params}
            label="Select Project"
          />
        )}
      />

      <Autocomplete
        id="usecases-select"
        fullWidth
        multiple
        options={getUseCases(selectedProject)}
        value={selectedUseCases}
        onChange={(event: any, value: any) => setSelectedUseCases(value)}
        groupBy={(option) => option.sprint.sprintName}
        getOptionLabel={(option: any) => option.title}
        renderInput={(params) => (
          <TextField
            margin="normal"
            fullWidth
            {...params}
            label="Select Use Case(s)"
          />
        )}
      />

      <DatePicker
        sx={{ width: '100%', marginY: 1 }}
        onChange={(date: dayjs.Dayjs) => setDate(date)}
        value={date}
        label={'Creation Date'}
      />
    </Container>
  );
};

export default UpdateScenario;
