const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    return error;
  }
};

export default getToken;
