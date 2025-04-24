import { createTask, putTaskName, deleteTask } from "../models/taskModel.js";

export const addTask = async (req, res) => {
  console.log("addTask called");

  try {
    const { task_name, column_id, start_date, due_date, description } =
      req.body;
    const newTask = await createTask(
      task_name,
      column_id,
      start_date,
      due_date,
      description
    );

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const renameTask = async (req, res) => {
  console.log("renameTask called");

  try {
    const task_id = req.params.id;
    const { task_name, column_id } = req.body;
    const updatedTask = await putTaskName(task_id, task_name, column_id);

    return res.status(201).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeTask = async (req, res) => {
  console.log("removeTask called");

  try {
    const task_id = req.params.id;
    const deleted = await deleteTask(task_id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
