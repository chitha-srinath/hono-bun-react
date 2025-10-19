export interface Todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	createdBy?: string;
	updatedBy?: string;
	createdAt: string;
	updatedAt?: string;
}
