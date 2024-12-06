import { object, string, TypeOf, date } from 'zod';

const ScenarioUpdateSchema = object({
  id: string(),
  designation: string(),
  description: string().min(1, 'Description is required'),
  date: date()
});

export type ScenarioUpdateInput = TypeOf<typeof ScenarioUpdateSchema>;
export default ScenarioUpdateSchema;
