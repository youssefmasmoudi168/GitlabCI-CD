import { object, string, TypeOf } from 'zod';

const TestCaseUpdateSchema = object({
  id: string().min(1, 'Use Case is required'),
  name: string().min(1, 'Name is required'),
  summary: string().min(1, 'Summary is required'),
  title: string().min(1, 'Title is required'),
  actor: string().min(1, 'Actor is required'),
  precondition: string().min(1, 'Precondition is required')
});

export type TestCaseUpdateInput = TypeOf<typeof TestCaseUpdateSchema>;
export default TestCaseUpdateSchema;
