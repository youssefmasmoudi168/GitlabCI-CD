import { object, string, TypeOf } from 'zod';

const UseCaseUpdateSchema = object({
  id: string().min(1, 'Sprint is required'),
  title: string().min(1, 'Title is required'),
  prereq: string().min(1, 'Prerequirements is required'),
  expectedResult: string().min(1, 'Expected Result is required')
});

export type UseCaseUpdateInput = TypeOf<typeof UseCaseUpdateSchema>;
export default UseCaseUpdateSchema;
