import { useCallback, useState } from "react";
import ITodo, { SortingOption } from "../../types/ITodo";
import Input from "../Input/Input";
import { Todo } from "../Todo/Todo";
import "./Form.css";
import { FilterPanel } from "../FilterPanel/FilterPanel";
const Form: React.FC = () => {
	const [filter, setFilter] = useState(SortingOption.ALL);
	const [todos, setTodos] = useState<ITodo[]>([]);
  
	
  
	const filterProducts = (product: ITodo) => {
	  if (filter === SortingOption.ACTIVE) return !product.checked;
	  if (filter === SortingOption.COMPLETED) return product.checked;
	  return true;
	};
  
	const updateTodo = useCallback((id: number) => {
	  setTodos(prevTodos =>
		prevTodos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked } : todo))
	  );
	}, []);
  
	const clearTodos = useCallback(() => {
	  setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, checked: false })));
	}, []);
  
	return (
	  <div className='form-wrapper'>
		<Input setTodos={setTodos} />
		<div className='todos-wrapper'>
		  {todos.length ? (
			todos
			  .filter(filterProducts)
			  .map((todo) => (
				<Todo updateTodo={updateTodo} key={todo.id} todo={todo} />
			  ))
		  ) : (
			<div>Nothing here yet...</div>
		  )}
		</div>
		<FilterPanel clearTodos={clearTodos} todos={todos} filter={filter} setFilter={setFilter} />
	  </div>
	);
  };
  
  export default Form;