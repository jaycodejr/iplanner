import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";
import { confirmation, loading, notify } from "./helper/utils";
import { useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const handleAddTodoItem = (newTodoItem) => {
    const isExist = todoItems.find(
      (todoItem) =>
        todoItem.name.toLowerCase() === newTodoItem.name.toLowerCase()
    );

    if (isExist) {
      notify("i", "Plan already exist");
      return;
    }
    loading(true);
    setTodoItems((todoItems) => [...todoItems, { ...newTodoItem }]);
    loading(false);
  };

  const handleTodoItemCompleted = (id) => {
    setTodoItems((todoItems) =>
      todoItems.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      )
    );
  };

  const handleTodoItemMarked = (id) => {
    setTodoItems((todoItems) =>
      todoItems.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, marked: !todoItem.marked }
          : todoItem
      )
    );
  };

  const handleTodoItemDelete = (id) => {};

  return (
    <div className="container">
      <ToastContainer />
      <TodoHeader />
      <TodoShadow>
        <TodoInput onAddTodoItem={handleAddTodoItem} />
      </TodoShadow>
      <div className="todo-clear"></div>
      <div className="todo-btn">
        <button className="todo-btn-complete">
          <FontAwesomeIcon icon={faCheckCircle} />
          Complete
        </button>
        <button className="todo-btn-delete">
          <FontAwesomeIcon icon={faTrashAlt} />
          Delete
        </button>
      </div>
      <TodoShadow>
        <TodoList
          onTodoItemCompleted={handleTodoItemCompleted}
          onTodoItemMarked={handleTodoItemMarked}
          onTodoItemDelete={handleTodoItemDelete}
          todoItems={todoItems}
        />
      </TodoShadow>
      <div className="todo-clear"></div>
      <Footer />
    </div>
  );
}

const TodoHeader = () => {
  return (
    <div className="header">
      <p>
        Welcome to{" "}
        <strong>
          <em>iPlanner</em>
        </strong>
      </p>
    </div>
  );
};

const TodoInput = ({ onAddTodoItem }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo) {
      notify("e", "Enter your plan description");
      return;
    }

    const proceed = await confirmation("Do you want save details?");

    if (proceed.isDismissed) {
      return;
    }

    if (proceed.isConfirmed) {
      onAddTodoItem({
        id: Date.now(),
        name: todo,
        completed: false,
        marked: false,
      });
      setTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo-input">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Your plan description..."
        />
        <button>ADD</button>
      </div>
    </form>
  );
};

const TodoItem = ({
  todoItem,
  onTodoItemCompleted,
  onTodoItemMarked,
  onTodoItemDelete,
}) => {
  return (
    <div className={`todo-item ${todoItem.completed && "completed"}`}>
      <div>
        {!todoItem.completed && (
          <input
            type="checkbox"
            checked={todoItem.marked}
            onChange={() => onTodoItemMarked(todoItem.id)}
          />
        )}
        <p>{todoItem.name}</p>
      </div>
      <div>
        {!todoItem.completed && (
          <>
            <span
              className="todo-check"
              onClick={() => onTodoItemCompleted(todoItem.id)}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>

            <span
              className="todo-remove"
              onClick={() => onTodoItemDelete(todoItem.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const TodoList = ({ todoItems, onTodoItemCompleted }) => {
  return (
    <div className="todo-list">
      {todoItems.length > 0 ? (
        todoItems.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            onTodoItemCompleted={onTodoItemCompleted}
          />
        ))
      ) : (
        <div className="todo-empty">
          <h5>😒 No data to display</h5>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <p className="footer">
      JayCode &copy; {new Date().getFullYear()}. All Rights Reserved
    </p>
  );
};

const TodoShadow = ({ children }) => {
  return <div className="todo-shadow">{children}</div>;
};

export default App;
