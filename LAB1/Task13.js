class Task {
  constructor(taskName, priority, dueDate, status = 'in-progress') {
    this.taskName = taskName;
    this.priority = priority;
    this.dueDate = new Date(dueDate);
    this.status = status;
  }

  isOverdue() {
    const today = new Date();
    return today > this.dueDate && this.status !== 'completed';
  }

  isUpcoming() {
    const today = new Date();
    return today <= this.dueDate && this.status !== 'completed';
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    console.log(`Task "${task.taskName}" added.`);
  }

  deleteTask(taskName) {
    const index = this.tasks.findIndex(task => task.taskName === taskName);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log(`Task "${taskName}" deleted.`);
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  }

  updateTask(taskName, updatedInfo) {
    const task = this.tasks.find(task => task.taskName === taskName);
    if (task) {
      Object.assign(task, updatedInfo);
      console.log(`Task "${taskName}" updated.`);
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  }

  sortByPriority() {
    this.tasks.sort((a, b) => a.priority - b.priority);
    console.log("Tasks sorted by priority.");
  }

  sortByDueDate() {
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
    console.log("Tasks sorted by due date.");
  }

  filterByStatus(status) {
    const filteredTasks = this.tasks.filter(task => task.status === status);
    console.log(`Filtered tasks with status "${status}":`);
    filteredTasks.forEach(task => this.displayTask(task));
  }

  displayTask(task) {
    const color = task.isOverdue() ? 'red' : task.isUpcoming() ? 'green' : 'black';
    console.log(`%cTask: ${task.taskName}, Priority: ${task.priority}, Due Date: ${task.dueDate.toDateString()}, Status: ${task.status}`, `color: ${color}`);
  }

  displayAllTasks() {
    this.tasks.forEach(task => this.displayTask(task));
  }
}

const taskManager = new TaskManager();

const task1 = new Task("Finish project", 1, "2025-01-10");
const task2 = new Task("Clean house", 2, "2025-01-05", "completed");
const task3 = new Task("Buy groceries", 3, "2025-01-12");

taskManager.addTask(task1);
taskManager.addTask(task2);
taskManager.addTask(task3);

taskManager.displayAllTasks();

taskManager.sortByPriority();
taskManager.displayAllTasks();

taskManager.sortByDueDate();
taskManager.displayAllTasks();

taskManager.filterByStatus("completed");

taskManager.updateTask("Buy groceries", { status: "completed", priority: 1 });
taskManager.displayAllTasks();

taskManager.deleteTask("Clean house");
taskManager.displayAllTasks();
