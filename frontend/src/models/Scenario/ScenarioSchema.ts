import { any, date, object, string, TypeOf } from 'zod';

const ScenarioSchema = object({
  designation: string().min(1, 'Description is required'),
  description: string().min(1, 'Description is required'),
  date: date(),
  UseCase: any()
});

export type ScenarioInput = TypeOf<typeof ScenarioSchema>;
export default ScenarioSchema;
