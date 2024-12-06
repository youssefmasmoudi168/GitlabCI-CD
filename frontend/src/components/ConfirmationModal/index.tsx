import { Close } from '@mui/icons-material';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography
} from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: 'text' | 'outlined' | 'contained';
  cancelVariant?: 'text' | 'outlined' | 'contained';
  confirmColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  cancelColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    paddingX: 3,
    paddingY: 3
  };
  return (
    <Modal onClose={props.onClose} open={props.open}>
      <Container sx={style}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{props.title}</Typography>
            <Typography variant="subtitle1">
              This action is irreversible
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body1">{props.description}</Typography>
        <Grid
          justifyContent="end"
          spacing={1}
          alignItems="center"
          container
          marginTop={2}
        >
          <Grid item>
            <Button
              color={props.cancelColor}
              variant={props.cancelVariant}
              onClick={props.onClose}
            >
              {props.cancelText}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color={props.confirmColor}
              variant={props.confirmVariant}
              onClick={props.onConfirm}
            >
              {props.confirmText}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

ConfirmationModal.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm'
};

export default ConfirmationModal;
