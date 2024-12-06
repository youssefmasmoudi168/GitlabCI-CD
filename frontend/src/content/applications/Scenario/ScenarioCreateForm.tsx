import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,

  Container,
  CssBaseline,

  TextField,

} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ScenarioSchema, {
  ScenarioInput
} from 'src/models/Scenario/ScenarioSchema';

import { useTheme } from '@emotion/react';
import { useFetchAllUseCasesQuery } from 'src/services/api/api';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import FormModal from 'src/components/FormModal';

const ScenarioCreateForm = (props: any) => {

  const [UseCases, setUseCases] = useState<any>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<any>();
  const [selectedProject, setSelectedProject] = useState<any>();

  const getSprint = (sprintId: any) => {
    const sprint = selectedProject?.sprints?.find(
      (s: any) => s.id === sprintId
    );
    return sprint;
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
    register,
    formState: { isSubmitSuccessful, errors },
    setValue,
    control
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    setValue('date', dayjs().toDate());
    if (selectedUseCases) {
      setValue('UseCase', selectedUseCases);
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <FormModal
        open={props.open}
        handleClose={props.handleClose}
        title="New Scenario"
        submitText="Create"
        formId="scenarioCreateForm"
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
              size="small"
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
      </FormModal>
      <CssBaseline />
    </Container>
  );
};

export default ScenarioCreateForm;
