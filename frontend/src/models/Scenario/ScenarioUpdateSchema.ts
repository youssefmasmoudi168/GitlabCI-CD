import dayjs, { type Dayjs } from 'dayjs';
import { array, object, string, TypeOf, any, z, date } from 'zod';

const ScenarioUpdateSchema = object({
  id: string(),
  designation: string().min(1, 'Description is required'),
  description: string().min(1, 'Description is required'),
  date: any(),
  UseCase: array(string())
});

export type ScenarioUpdateInput = TypeOf<typeof ScenarioUpdateSchema>;
export default ScenarioUpdateSchema;
