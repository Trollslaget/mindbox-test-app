import React, { memo } from "react";
import ITodo from "../../types/ITodo";
import "./Todo.css"
interface TodoProps {
	todo: ITodo;
	updateTodo: (id: number) => void;
}
export const Todo: React.FC<TodoProps> = memo(({ todo, updateTodo }) => {
	return (
		<div className='todo-item'>
			<input
				id={todo.id.toString()}
				type='checkbox'
				checked={todo.checked}
				onChange={() => updateTodo(todo.id)}
			/>
			<label className={`todo-label ${todo.checked && 'checked'}`} htmlFor={todo.id.toString()}> {todo.text}</label>
		</div>
	);
});
