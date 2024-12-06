import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import ExecutionSchema, {
  ExecutionInput
} from 'src/models/Execution/ExecutionSchema';

const CreateExecutionForm = (props: any) => {
  const [etat, setEtat] = useState('');

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
  const methods = useForm<ExecutionInput>({
    resolver: zodResolver(ExecutionSchema)
  });
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    setValue
  } = methods;

  useEffect(() => {
    setValue('testCase', props?.testCase?.id?.toString());
  }, [setValue, props?.testCase?.id?.toString()]);

  useEffect(() => {
    setValue('etat', etat == 'validated' ? 1 : 0);
  }, [setValue, etat]);

  const onSubmitHandler: SubmitHandler<ExecutionInput> = (values) => {
    reset();
    props?.handleClose();

    props?.createExecution({ ...values });
  };
  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Typography component="h4" variant="h4">
              Execute {props?.testCase?.testCaseName}
            </Typography>

            <TextField
              margin="normal"
              size="small"
              variant="outlined"
              required
              fullWidth
              id="support"
              label="Support"
              name="support"
              autoComplete="support"
              autoFocus
              {...register('support')}
            />
            <FormControl size="small">
              <RadioGroup
                aria-labelledby="status"
                name="etat"
                value={etat}
              >
                <FormControlLabel
                  value="validated"
                  onClick={() => setEtat('validated')}
                  control={<Radio size="small" />}
                  label="Validated"
                />
                <FormControlLabel
                  value="invalidated"
                  onClick={() => setEtat('invalidated')}
                  control={<Radio size="small" />}
                  label="Invalidated"
                />
              </RadioGroup>
            </FormControl>
            <input id="testCase" type="hidden" {...register('testCase')} />
            <input id="testCase" type="hidden" {...register('etat')} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default CreateExecutionForm;
