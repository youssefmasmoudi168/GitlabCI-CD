import { object, string, TypeOf } from 'zod';

const UserSchema = object({
	firstName: string().min(1, 'A first name is required'),
	lastName: string().min(1, 'A last name is required'),
	email: string().min(1, 'An email is required'),
	password: string().min(1, 'A password is required'),
	roles: string().min(1, 'A role is required'),
});

export type UserInput = TypeOf<typeof UserSchema>;
export default UserSchema;
