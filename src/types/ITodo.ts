interface ITodo {
	id: number;
	text: string;
	checked: boolean;
}

export default ITodo;
export type TodoContextType = {
	todos: ITodo[];
	saveTodo: (todo: ITodo) => void;
	updateTodo: (id: number) => void;
};

export enum SortingOption {
	ALL = "all",
	ACTIVE = "active",
	COMPLETED = "completed"
}
