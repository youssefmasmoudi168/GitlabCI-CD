import { any, date, object, string, TypeOf } from 'zod';

const SprintSchema = object({
  testProject: string(),
  sprintName: string().min(1, 'Sprint Name is required'),
  priority: string().min(1, 'Priority is required'),
  startDate: any(),
  endDate: any(),
  userStory: string().min(1, 'User Story is required')
});

export type SprintInput = TypeOf<typeof SprintSchema>;
export default SprintSchema;
