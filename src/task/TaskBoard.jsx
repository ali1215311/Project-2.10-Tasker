import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to Learn React such that I can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (editedTask) => {
    setTaskToUpdate(editedTask);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  };

  const handleDeleteAll = () => {
    setTasks(Array.from({ length: 0 }));
  };

  const handleFav = (taskId) => {
    const favIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[favIndex].isFavorite = !tasks[favIndex].isFavorite;
    setTasks(newTasks);
  };

  const handleSearch = (e, searchTerm) => {
    e.preventDefault();
    const searchedTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...searchedTask]);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddTask}
            taskToUpdate={taskToUpdate}
            onCloseClick={handleCloseClick}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearch} />
          </div>
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onAddClick={() => setShowAddModal(true)}
              onDeleteAll={handleDeleteAll}
            />
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleTaskDelete}
              onFav={handleFav}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default TaskBoard;
