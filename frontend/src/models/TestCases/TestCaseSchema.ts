import { object, string, TypeOf } from 'zod';

const TestCaseSchema = object({
  useCaseId: string().min(1, 'Use Case is required'),
  name: string().min(1, 'Name is required'),
  summary: string().min(1, 'Summary is required'),
  title: string().min(1, 'Title is required'),
  actor: string().min(1, 'Actor is required'),
  precondition: string().min(1, 'Precondition is required')
});

export type TestCaseInput = TypeOf<typeof TestCaseSchema>;
export default TestCaseSchema;
