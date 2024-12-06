import { api } from '../api/api';
import { store } from '../store';

const testCasesLoader = async (useCaseId: any) => {
  const result = await store.dispatch(
    api.endpoints.fetchAllTestCasesByUseCaseId.initiate(useCaseId)
  );

  return [result, { useCaseId }];
};

export default testCasesLoader;
