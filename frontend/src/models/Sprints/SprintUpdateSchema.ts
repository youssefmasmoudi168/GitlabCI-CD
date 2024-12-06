import { any, object, string, TypeOf } from 'zod';

const SprintUpdateSchema = object({
  id: string().min(1, 'Test Project is required'),
  sprintName: string().min(1, 'Sprint Name is required'),
  priority: string(),
  startDate: any(),
  endDate: any(),
  userStory: string().min(1, 'User Story is required')
});

export type SprintUpdateInput = TypeOf<typeof SprintUpdateSchema>;
export default SprintUpdateSchema;
