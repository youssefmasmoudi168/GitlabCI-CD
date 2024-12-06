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
import { FormEventHandler, ReactNode } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'react-router-dom';

interface ActionModalProps {
  open: boolean;
  handleClose: () => void;
  handleAction: () => void;
  children: ReactNode;
  title: string;
  subtitle?: string;
  actionText: string;
}

const ActionModal = (props: ActionModalProps) => {
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

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{props.title}</Typography>
            {props.subtitle && (
              <Typography variant="subtitle1">{props.subtitle}</Typography>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={props.handleClose} size="small">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        {props.children}
        <Grid
          justifyContent="end"
          spacing={1}
          alignItems="center"
          container
          marginTop={2}
        >
          <Grid item>
            <Button
              size="small"
              onClick={props.handleClose}
              variant="text"
              color="primary"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              onClick={props.handleAction}
              variant="contained"
            >
              {props.actionText}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

ActionModal.defaultProps = {
  open: false,
  actionText: 'Submit'
};

export default ActionModal;
