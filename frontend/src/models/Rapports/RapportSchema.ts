import { object, string, TypeOf, any } from 'zod';

const RapportSchema = object({
  scenario: any()
});

export type RapportInput = TypeOf<typeof RapportSchema>;
export default RapportSchema;
