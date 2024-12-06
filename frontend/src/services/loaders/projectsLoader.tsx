import { api } from '../api/api';
import { store } from '../store';

const projectsLoader = async (userId: any) => {
  const result = await store.dispatch(
    api.endpoints.fetchAllTestProjectsByUserId.initiate(userId)
  );

  return [result, { userId }];
};

export default projectsLoader;
