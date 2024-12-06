import { array, object, string, TypeOf } from 'zod';

const UserUpdateSchema = object({
	id: string().min(1, 'ID is required'),
	firstName: string().min(1, 'A first name is required'),
	lastName: string().min(1, 'A last name is required'),
	email: string().min(1, 'An email is required'),
	password: string().min(1, 'A password is required'),
	roles: array(string()).min(1, 'A role is required'),
});

export type UserUpdateInput = TypeOf<typeof UserUpdateSchema>;
export default UserUpdateSchema;
