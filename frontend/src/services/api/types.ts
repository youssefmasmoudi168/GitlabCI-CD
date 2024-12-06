export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	roles: Object;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	is_verified: number;
}

export type TokenUser = {
	username?: any;
	roles?: any;
	isTokenExpired: boolean;
};

export interface ITestProject {
	id: number;
	projectName: String;
	creationDate: Date;
	author: String;
	client: String;
	createdAt: Date;
	updatedAt: Date;
	userId: Number;
}

export interface ISprint {
	id: Number;
	sprintName: String;
	priority: String;
	startDate: Date;
	endDate: Date;
	userStory: string;
	createdAt: Date;
	updatedAt: Date;
	projectId: Number;
}

export interface IUseCase {
	id: Number;
	title: String;
	prereq: String;
	expectedResult: String;
	createdAt: Date;
	updatedAt: Date;
	sprintId: Number;
}

export interface ITestCase {
	id: Number;
	testCaseName: String;
	summary: String;
	title: String;
	actor: String;
	preCondition: String;
	createdAt: Date;
	updatedAt: Date;
	useCaseId: Number;
}

export interface IScenario {
	id: Number;
	description: String;
	createdAt: Date;
	updatedAt: Date;
	useCaseId: Number;
}
export interface IExecCampaign {
	id: Number;
	author: String;
	scenarioId: Number;
	createdAt: Date;
	updatedAt: Date;
	useCaseId: Number;
}
export interface ITestStep {
	id: Number;
	action: String;
	expectedResult: String;
	scenarioId: Number;
	createdAt: Date;
	updatedAt: Date;
	useCaseId: Number;
}

export interface ILoginResponse {
	token: string;
	user: object;
}

export interface IGenericResponse {
	status: string;
	message: string;
}
