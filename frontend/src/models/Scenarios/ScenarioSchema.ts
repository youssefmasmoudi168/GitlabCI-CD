import { array, date, object, string, TypeOf } from 'zod';

const ScenarioSchema = object({
  description: string().min(1, 'Description is required'),
  designation: string().min(1, 'Designation is required'),
  date: date().min(new Date(2021, 1, 1), 'Date must be after 2021')
});

export type ScenarioInput = TypeOf<typeof ScenarioSchema>;
export default ScenarioSchema;
