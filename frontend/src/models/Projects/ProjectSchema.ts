import { object, string, TypeOf, date } from 'zod';

const ProjectSchema = object({
  user: string(),
  projectName: string().min(1, 'Project Name is required').max(100),
  dateCreation: date(),
  author: string().min(1, 'Author is required').max(100),
  client: string().min(1, 'Client is required').max(100)
});

export type ProjectInput = TypeOf<typeof ProjectSchema>;
export default ProjectSchema;
