import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography
} from '@mui/material';
import {
  FormEventHandler,
  ReactChild,
  ReactNode,
  Ref,
  forwardRef
} from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'react-router-dom';

interface FormModalProps {
  open: false | true;
  handleClose: () => void;
  children: any;
  title: string;
  subtitle?: string;
  submitText: string;
  formId: string;
}

const FormModal = (props: FormModalProps) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    paddingX: 3,
    paddingY: 3
  };

  const {
    open = false,
    handleClose,
    children,
    title,
    subtitle,
    submitText = 'Submit',
    formId
  } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={11}>
            <Typography variant="h4">{title}</Typography>
            {subtitle && (
              <Typography variant="subtitle1">{subtitle}</Typography>
            )}
          </Grid>
          <Grid item xs={1} alignSelf="start">
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <>{children}</>
        <Grid
          justifyContent="end"
          spacing={1}
          alignItems="center"
          container
          marginTop={2}
        >
          <Grid item>
            <Button onClick={handleClose} variant="text" color="primary">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button form={formId} type="submit" variant="contained">
              {submitText}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default FormModal;
