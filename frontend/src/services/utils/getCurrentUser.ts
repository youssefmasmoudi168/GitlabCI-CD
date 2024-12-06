const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('currentUser') as string);
  } catch (error) {
    return error;
  }
};

export default getCurrentUser;
