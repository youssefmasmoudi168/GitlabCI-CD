import isLoggedIn from './isLoggedIn';
import getCurrentUser from './getCurrentUser';
const getUserRole = () => {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    switch (user.roles[0]) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_TESTOR':
        return 'Tester';
      case 'ROLE_VISITOR':
        return 'Visitor';
      default:
        return 'ROLE_VISITOR';
    }
  }
  return;
};

export default getUserRole;
