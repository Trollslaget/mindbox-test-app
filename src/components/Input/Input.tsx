import React, { useState, useCallback, memo } from "react";
import ITodo from "../../types/ITodo";
import "./Input.css";

const Input: React.FC<{
	setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}> = memo(({ setTodos }) => {
	const [todoInput, setTodoInput] = useState<string>("");

	const saveTodoHandler = useCallback(
		(text: string) => {
			const newTodo = {
				id: Date.now(),
				text,
				checked: false,
			};
			setTodos((prev) => [...prev, newTodo]);
		},
		[setTodos]
	);
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (todoInput.trim()) {
				saveTodoHandler(todoInput);
				setTodoInput("");
			}
		},
		[todoInput, saveTodoHandler]
	);
	return (
		<form className='form' onSubmit={handleSubmit}>
			<input
				className='todo-input'
				value={todoInput}
				onChange={(e) => {
					setTodoInput(e.target.value);
				}}
				type='text'
				placeholder='What needs to be done?'
			/>
			<button
				className={`submit-btn ${todoInput.length ? "active" : ""}`} // Исправленный синтаксис
				type='submit'
				disabled={!todoInput.trim()}
			>
				Добавить
			</button>
		</form>
	);
});

export default Input;
