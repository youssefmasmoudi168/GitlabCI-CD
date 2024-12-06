import getToken from './getToken';
import { isExpired } from 'react-jwt';
const isLoggedIn = () => {
  const token = getToken();
  return !isExpired(token);
};

export default isLoggedIn;
