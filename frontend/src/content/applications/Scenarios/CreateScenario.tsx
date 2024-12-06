import {zodResolver} from '@hookform/resolvers/zod';
import {Autocomplete, Container, TextField} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import ScenarioSchema, {ScenarioInput} from 'src/models/Scenario/ScenarioSchema';

import {useFetchAllUseCasesQuery} from 'src/services/api/api';
import {DateField} from '@mui/x-date-pickers';

const CreateScenario = (props: any) => {
  
  const [UseCases, setUseCases] = useState<any>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<any>();
  const [selectedProject, setSelectedProject] = useState<any>();

  const getSprint = (sprintId: any) => {
    return selectedProject?.sprints?.find(
        (sprint: any) => sprint.id === sprintId
    );
  };

  const getUseCases = (project: any) => {
    const uc = [];
    project?.sprints?.forEach((sprint: any) => {
      sprint?.useCases?.forEach((useCase: any) => {
        uc.push(useCase);
      });
    });
    if (uc.length === 0) {
      return null;
    }
    return uc;
  };

  const projects = props?.projects?.filter((p: any) => p !== null);

  useEffect(() => {
    if (selectedProject) {
      const hasUseCases = Boolean(getUseCases(selectedProject));
      if (hasUseCases) {
        setUseCases(getUseCases(selectedProject));
      } else {
        setUseCases([]);
        setSelectedUseCases([]);
      }
    } else {
      if (selectedUseCases) {
        setUseCases([]);
        setSelectedUseCases([]);
      }
    }
  }, [selectedProject]);

  const methods = useForm<ScenarioInput>({
    resolver: zodResolver(ScenarioSchema)
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    setValue,
    control
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue('date', dayjs().toDate());
    if (selectedUseCases) {
      setValue('UseCase', selectedUseCases);
    }
  });

  const onSubmitHandler: SubmitHandler<ScenarioInput> = (values) => {
    props.handleClose();
    props.createScenario({ ...values });
  };

  return (
    <Container
      component="form"
      id="scenarioCreateForm"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="designation"
        label="Designation"
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
        autoFocus
        {...register('description')}
      />
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DateField
            margin="normal"
            fullWidth
            label="Creation Date"
            disableFuture
            defaultValue={dayjs()}
          />
        )}
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
        options={UseCases}
        value={selectedUseCases}
        onChange={(event: any, value: any) => setSelectedUseCases(value)}
        groupBy={(option) => getSprint(option?.sprint)?.sprintName}
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
    </Container>
  );
};

export default CreateScenario;
