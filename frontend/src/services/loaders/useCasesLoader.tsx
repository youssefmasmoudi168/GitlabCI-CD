import { store } from '../store';
import { api } from '../api/api';

const useCasesLoader = async (sprintId: any) => {
  const result = await store.dispatch(
    api.endpoints.fetchAllUseCasesBySprintId.initiate(sprintId)
  );

  return [result, { sprintId }];
};

export default useCasesLoader;
