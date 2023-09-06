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
    setTodoItems((todoItems) => [...todoItems, { ...newTodoItem }]);
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

  return (
    <div className="container">
      <ToastContainer />
      <TodoHeader />
      <TodoShadow>
        <TodoInput onAddTodoItem={handleAddTodoItem} />
      </TodoShadow>
      <div className="todo-clear"></div>
      <TodoShadow>
        <TodoList
          onTodoItemCompleted={handleTodoItemCompleted}
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
      loading(true);
      onAddTodoItem({
        id: Date.now(),
        name: todo,
        completed: false,
      });
      loading(false);
      notify("s", "Added successfully");

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

const TodoItem = ({ todoItem, onTodoItemCompleted }) => {
  return (
    <div className={`todo-item ${todoItem.completed && "completed"}`}>
      <div>
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={() => onTodoItemCompleted(todoItem.id)}
        />
        <p>{todoItem.name}</p>
      </div>
      <div>
        <span className="todo-check">
          <FontAwesomeIcon icon={faCheckCircle} />
        </span>
        <span className="todo-remove">
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
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
