import { date, number, object, string, TypeOf } from 'zod';

const ExecutionSchema = object({
  support: string().min(1, 'Description is required'),
  etat: number(),
  testCase: string()
});

export type ExecutionInput = TypeOf<typeof ExecutionSchema>;
export default ExecutionSchema;
