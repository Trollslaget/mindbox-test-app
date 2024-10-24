import { render, screen, fireEvent } from "@testing-library/react";

import Form from "./components/Form/Form";
import ITodo, { SortingOption } from "./types/ITodo";
import { FilterPanel } from "./components/FilterPanel/FilterPanel";

describe("Input Component", () => {
	test("adds a new todo item", () => {
		render(<Form />);

		const inputField = screen.getByPlaceholderText("What needs to be done?");
		const addButton = screen.getByRole("button", { name: /Добавить/i });

		fireEvent.change(inputField, { target: { value: "New Todo" } });

		fireEvent.click(addButton);

		expect(screen.getByText("New Todo")).toBeInTheDocument();
	});

	test("does not add an empty todo item", () => {
		render(<Form />);

		const inputField = screen.getByPlaceholderText("What needs to be done?");
		const addButton = screen.getByRole("button", { name: /Добавить/i });

		fireEvent.change(inputField, { target: { value: "" } });
		fireEvent.click(addButton);

		expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
	});
});
describe("FilterPanel Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const mockSetFilter = jest.fn();
	const mockClearTodos = jest.fn();

	const todos: ITodo[] = [
		{ id: 1, text: "Todo 1", checked: false },
		{ id: 2, text: "Todo 2", checked: true },
		{ id: 3, text: "Todo 3", checked: false },
	];

	test("displays the correct number of items left", () => {
		render(
			<FilterPanel
				todos={todos}
				setFilter={mockSetFilter}
				clearTodos={mockClearTodos}
				filter={SortingOption.ALL}
			/>
		);

		expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
	});

	test("calls clearTodos when clicking the Clear completed button", () => {
		render(
			<FilterPanel
				todos={todos}
				setFilter={mockSetFilter}
				clearTodos={mockClearTodos}
				filter={SortingOption.ALL}
			/>
		);

		const clearButton = screen.getByRole("button", {
			name: /Clear completed/i,
		});
		fireEvent.click(clearButton);

		expect(mockClearTodos).toHaveBeenCalledTimes(1);
	});

	test("filter buttons change filter", () => {
		render(
			<FilterPanel
				todos={todos}
				setFilter={mockSetFilter}
				clearTodos={mockClearTodos}
				filter={SortingOption.ALL}
			/>
		);

		const activeButton = screen.getByRole("button", { name: /Active/i });
		fireEvent.click(activeButton);

		expect(mockSetFilter).toHaveBeenCalledWith(SortingOption.ACTIVE);
	});
});
