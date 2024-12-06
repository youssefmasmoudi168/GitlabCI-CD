import { api } from '../api/api';
import { store } from '../store';

const sprintsLoader = async (projectId: any) => {
  const result = await store.dispatch(
    api.endpoints.fetchAllSprintsByProjectId.initiate(projectId)
  );

  return [result, { projectId }];
};

export default sprintsLoader;
