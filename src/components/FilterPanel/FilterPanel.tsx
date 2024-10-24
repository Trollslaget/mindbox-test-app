import React, { useCallback } from "react";
import ITodo, { SortingOption } from "../../types/ITodo";
import "./FilterPanel.css";
import { FilterBtn } from "../UI/FilterBtn";

interface FilterPanelProps {
	todos: ITodo[];
	setFilter: React.Dispatch<React.SetStateAction<SortingOption>>;
	clearTodos: () => void;
	filter: SortingOption;
}
export const FilterPanel: React.FC<FilterPanelProps> = ({
	setFilter,
	todos,
	clearTodos,
	filter,
}) => {
	return (
		<div className='filter-grid'>
			<span>{todos.filter((i) => !i.checked).length} items left</span>
			<div className='filter-nav-container'>
				<FilterBtn
					handler={useCallback(() => setFilter(SortingOption.ALL),[setFilter])}
					text='All'
					className={filter === SortingOption.ALL ? "active" : ""}
				/>
				<FilterBtn
					handler={useCallback(() => setFilter(SortingOption.ACTIVE),[setFilter])}
					text='Active'
					className={filter === SortingOption.ACTIVE ? "active" : ""}
				/>
				<FilterBtn
					handler={useCallback(() => setFilter(SortingOption.COMPLETED),[setFilter])}
					text='Completed'
					className={filter === SortingOption.COMPLETED ? "active" : ""}
				/>
			</div>
			<button onClick={clearTodos}>Clear completed</button>
		</div>
	);
};
