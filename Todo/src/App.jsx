import { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const isInitialMount = useRef(true);
  const [editTask, setEditTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!inputValue) return;

    if (task.some((t) => t.text === inputValue)) return;
    setTask((prevTask) => [
      ...prevTask,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  }

  function handleDelete(id) {
    const updatetodo = task.filter((todo) => todo.id !== id);
    setTask(updatetodo);
  }
  function handleComplete(id) {
    const completedtodo = task.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTask(completedtodo);
  }

  useEffect(() => {
    try {
      const savedTask = localStorage.getItem("todo-list");
      if (savedTask) {
        setTask(JSON.parse(savedTask));
      }
    } catch (err) {
      console.error("Could not load tasks from localStorage", err);
      localStorage.removeItem("todo-list");
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("todo-list", JSON.stringify(task));
  }, [task]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#1C325B] p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 mt-6">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <h1 className="text-3xl md:text-4xl font-bold text-black text-center ">
            Todo App
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center">
            Organize your tasks
          </p>
        </div>
        <div className="flex  items-center justify-center  mt-12  ">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex flex-row items-center justify-center gap-4 flex-wrap w-full "
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              autoComplete="off"
              placeholder="Enter your task"
              className="border border-gray-300 rounded-md p-2 w-64 sm:w-80"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
              Add Task
            </button>
          </form>
        </div>
        <ul className="mt-10 w-full space-y-4">
          {task.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 rounded-md p-3 shadow-sm"
            >
              {editTaskId === todo.id ? (
                <div className="flex sm:flex-row flex-col sm:w-60 w-36">
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 "
                  />
                  <button
                    onClick={() => {
                      const editedtodos = task.map((t) =>
                        t.id === todo.id ? { ...t, task: editTask } : t
                      );

                      setTask(editedtodos);
                      setEditTask("");
                      setEditTaskId(null);
                    }}
                     className="ml-1 text-blue-600 cursor-pointer "
                  >
                    save
                  </button>
                </div>
              ) : (
                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }
                >
                  {todo.text}
                </span>
              )}
              <div className="flex gap-3 text-xl text-green-600 ">
                <button onClick={() => handleComplete(todo.id)}>
                  <FaCheckCircle className="cursor-pointer" />
                </button>
                <button
                  onClick={() => {
                    setEditTask(todo.text);
                    setEditTaskId(todo.id);
                  }}
                >
                  <MdModeEdit className="cursor-pointer" />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600"
                >
                  <MdDeleteForever className="cursor-pointer" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
