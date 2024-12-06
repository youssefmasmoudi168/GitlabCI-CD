import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import getCurrentUser from 'src/services/utils/getCurrentUser';
import getUserRole from 'src/services/utils/getUserRole';

function HeaderMenu() {
  const theme = useTheme();
  const user: any = getCurrentUser();
  return (
    <>
      <List disablePadding component={Box} display="flex">
        <ListItem component={NavLink} to={`/profile/${user.id}`}>
          <ListItemAvatar>
            <Avatar
              sx={{ bgcolor: theme.palette.primary.light }}
            >{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={`${user.firstName} ${user.lastName}`}
            secondary={`${getUserRole()}`}
          />
        </ListItem>
      </List>
    </>
  );
}

export default HeaderMenu;
